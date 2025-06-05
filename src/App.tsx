import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import { /* useState, useEffect */ } from 'react'; // Remove useState and useEffect
import { mockChats } from './utils/mockData';
import type { Chat, Message } from './types/chatTypes';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'; // Add useQuery and useQueryClient

// Create a client
const queryClient = new QueryClient();

// Query function to load chats from localStorage
const fetchChats = (): Chat[] => {
  const savedChats = localStorage.getItem('chatHistory');
  return savedChats ? JSON.parse(savedChats) : mockChats;
};

function App() {
  const client = useQueryClient(); // Get the query client instance

  // Use useQuery to manage chat data
  const { data: chats } = useQuery<Chat[]>({ // Rename data to chats
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  // Remove useEffect for saving chats
  // useEffect(() => {
  //   localStorage.setItem('chatHistory', JSON.stringify(chats));
  // }, [chats]);

  // Modified updateChatMessages to accept a function to update messages and update via queryClient.setQueryData
  const updateChatMessages = (
    chatId: string,
    updateFn: (prevMessages: Message[]) => Message[]
  ) => {
    client.setQueryData<Chat[]>(['chats'], prevChats => {
      const newChats = prevChats ? prevChats.map(chat =>
        chat.id === chatId ? { ...chat, messages: updateFn(chat.messages) } : chat
      ) : [];
      // Save to localStorage immediately after updating query data
      localStorage.setItem('chatHistory', JSON.stringify(newChats));
      return newChats;
    });
  };
  
  const updateChatLastMessagePreview = (chatId: string, lastMessagePreview: string) => {
    client.setQueryData<Chat[]>(['chats'], prevChats => {
      const newChats = prevChats ? prevChats.map(chat =>
        chat.id === chatId ? { ...chat, lastMessagePreview: lastMessagePreview } : chat
      ) : [];
      // Save to localStorage immediately after updating query data
      localStorage.setItem('chatHistory', JSON.stringify(newChats));
      return newChats;
    });
  };

  // Ensure chats is not undefined before passing to HomePage, though useQuery should return initialData (mockChats) immediately
  if (!chats) {
      return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route 
            path="/"
            element={<HomePage chats={chats} updateChatMessages={updateChatMessages} updateChatLastMessagePreview={updateChatLastMessagePreview} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;