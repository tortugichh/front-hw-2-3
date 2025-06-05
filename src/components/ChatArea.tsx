import React, { useState, useRef, useEffect } from 'react';
import type { Chat, Message } from '../types/chatTypes';
import MessageItem from './MessageItem';
import { generateGeminiResponse } from '../utils/geminiApi';
import { Send, Paperclip, Smile, MoreVertical, Phone, VideoIcon, Bot, ArrowLeft } from 'lucide-react';

interface ChatAreaProps {
  selectedChat: Chat | undefined;
  updateChatMessages: (chatId: string, updateFn: (prevMessages: Message[]) => Message[]) => void;
  updateChatLastMessagePreview: (chatId: string, lastMessagePreview: string) => void;
  onBackToList: () => void;
}

function ChatArea({ selectedChat, updateChatMessages, updateChatLastMessagePreview, onBackToList }: ChatAreaProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  if (!selectedChat) {
    return null;
  }

  const handleSendMessage = async () => { 
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),  
      sender: 'user',
      text: trimmedMessage,
      timestamp: Date.now(),
      type: 'text',
      status: 'sent', 
    };

    // Update the global state with the user's message using the new updateFn signature
    updateChatMessages(selectedChat!.id, (prevMessages) => [...prevMessages, newMessage]);

    updateChatLastMessagePreview(selectedChat!.id, trimmedMessage);
    setInputMessage(''); 

    // Handle AI response for AI chats
    if (selectedChat?.type === 'ai') {
      setIsTyping(true);
      
      try {
        // Note: generateGeminiResponse is not yet implemented and will cause errors if called if not mocked.
        const aiResponseText = await generateGeminiResponse(trimmedMessage);

        const aiMessage: Message = {
          id: Date.now().toString() + '-ai', 
          sender: 'ai',
          text: aiResponseText,
          timestamp: Date.now(),
          type: 'text',
          status: 'sent',
        };

        // Add the AI message using the new updateFn signature
        updateChatMessages(selectedChat!.id, (prevMessages) => [...prevMessages, aiMessage]);
        updateChatLastMessagePreview(selectedChat!.id, aiMessage.text);

      } catch (error) {
        console.error('Error getting AI response:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      handleSendMessage();
    }
  };


  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-gray-100">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Back button for mobile */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onBackToList}
              aria-label="Back to chat list"
            >
              <ArrowLeft size={24} />
            </button>
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white font-semibold">
                {selectedChat.avatar ? (
                  <img 
                    src={selectedChat.avatar} 
                    alt={`${selectedChat.name} avatar`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  selectedChat.type === 'ai' ? (
                    <Bot size={16} />
                  ) : (
                    selectedChat.name.charAt(0).toUpperCase()
                  )
                )}
              </div>
              {selectedChat.type === 'person' && (
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  selectedChat.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              )}
            </div>
            
            {/* Chat Info */}
            <div>
              <h2 className="font-semibold text-gray-800 flex items-center">
                {selectedChat.name}
                {selectedChat.type === 'ai' && (
                  <Bot size={14} className="ml-1 text-gray-500" />
                )}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedChat.type === 'person' 
                  ? selectedChat.isOnline ? 'online' : 'last seen recently'
                  : 'AI Assistant - always online'
                }
                {isTyping && selectedChat?.type === 'ai' && ' • typing...'}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            {selectedChat.type === 'person' && (
              <>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <VideoIcon size={18} />
                </button>
              </>
            )}
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-900">
        <div className="p-4 space-y-2">
          {selectedChat?.messages.map((message, index) => (
            <MessageItem 
              key={message.id} 
              message={message}
              isConsecutive={
                index > 0 && 
                selectedChat.messages[index - 1].sender === message.sender &&
                message.timestamp - selectedChat.messages[index - 1].timestamp < 60000
              }
            />
          ))}
          
          {isTyping && selectedChat?.type === 'ai' && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-xl rounded-bl-md px-3 py-2 text-sm text-gray-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end space-x-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip size={20} />
          </button>
          
          <textarea
            ref={inputRef}
            className="flex-1 resize-none text-black text-sm py-2 px-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 bg-gray-100"
            placeholder="Write a message..."
            rows={1}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Smile size={20} />
          </button>
          
          <button 
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;