import { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatArea from '../components/ChatArea';
import type { Chat, Message } from '../types/chatTypes';
import { MessageCircle, Search, Menu } from 'lucide-react';

interface HomePageProps {
  chats: Chat[];
  updateChatMessages: (
    chatId: string,
    updateFn: (prevMessages: Message[]) => Message[]
  ) => void;
  updateChatLastMessagePreview: (chatId: string, lastMessagePreview: string) => void;
}

function HomePage({ chats, updateChatMessages, updateChatLastMessagePreview }: HomePageProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(undefined);

  const selectedChat: Chat | undefined = chats.find(chat => chat.id === selectedChatId);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChatId(chat.id);
  };

  // New function to handle going back to the chat list
  const handleBackToChatList = () => {
    setSelectedChatId(undefined);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Chat List */}
      <div className={`w-full sticky bottom-0 z-10 md:w-80 flex-shrink-0 border-r flex flex-col bg-gray-50 ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 flex items-center justify-between bg-white border-b">
          <div className="flex items-center space-x-3">
            <Menu size={24} className="cursor-pointer text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-800">Chat App</h1>
          </div>
          <Search size={20} className="cursor-pointer text-gray-600" />
        </div>
        
        <ChatList chats={chats} onSelectChat={handleChatSelect} selectedChatId={selectedChatId} />
      </div>

      {/* Right Panel - Chat Area */}
      <div className={`flex-1 flex flex-col bg-white ${selectedChatId ? 'flex' : 'hidden md:flex'}`}>
        {selectedChat ? (
          <ChatArea 
            selectedChat={selectedChat} 
            updateChatMessages={updateChatMessages}
            updateChatLastMessagePreview={updateChatLastMessagePreview}
            onBackToList={handleBackToChatList} // Pass the new function
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a chat</h2>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;