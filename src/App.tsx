import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import React, { useState, useEffect } from 'react';
import { mockChats } from './utils/mockData';
import type { Chat, Message } from './types/chatTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  // Load chats from localStorage or use mockChats as initial state
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chatHistory');
    return savedChats ? JSON.parse(savedChats) : mockChats;
  });

  // Save chats to localStorage whenever the chats state changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chats));
  }, [chats]); // Dependency array includes chats so the effect runs when chats changes

  // Modified updateChatMessages to accept a function to update messages
  const updateChatMessages = (
    chatId: string,
    updateFn: (prevMessages: Message[]) => Message[]
  ) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, messages: updateFn(chat.messages) } : chat
      )
    );
  };
  
  const updateChatLastMessagePreview = (chatId: string, lastMessagePreview: string) => {
     setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, lastMessagePreview: lastMessagePreview } : chat
      )
    );
  };

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