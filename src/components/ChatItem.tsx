import React from 'react';
import type { Chat } from '../types/chatTypes';
import { Bot, Check, CheckCheck } from 'lucide-react';

interface ChatItemProps {
  chat: Chat;
  onClick: () => void;
  isSelected: boolean;
}

function ChatItem({ chat, onClick, isSelected }: ChatItemProps) {
  // Format the last message time
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (diffInHours < 168) { // Less than a week
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const lastMessage = chat.messages[chat.messages.length - 1];
  const lastMessageTime = lastMessage ? formatTime(lastMessage.timestamp) : '';

  return (
    <div 
      className={`chat-item flex items-center px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
        isSelected ? 'bg-blue-100' : ''
      }`}
      onClick={onClick}
    >
      {/* Avatar Container */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
          {chat.avatar ? (
            <img 
              src={chat.avatar} 
              alt={`${chat.name} avatar`} 
              className="w-full h-full object-cover"
            />
          ) : (
            chat.type === 'ai' ? (
              <Bot size={20} />
            ) : (
              chat.name.charAt(0).toUpperCase()
            )
          )}
        </div>
        
        {/* Online Status Indicator */}
        {chat.type === 'person' && (
          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
            chat.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0 ml-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-800 truncate text-sm">
            {chat.name}
            {chat.type === 'ai' && (
              <Bot size={14} className="inline ml-1 text-gray-500" />
            )}
          </h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Message Status Icons */}
            {lastMessage && lastMessage.sender === 'user' && (
              <div className="text-gray-500">
                {lastMessage.status === 'sent' && <Check size={12} />}
                {lastMessage.status === 'delivered' && <CheckCheck size={12} />}
                {lastMessage.status === 'read' && <CheckCheck size={12} className="text-blue-600" />}
              </div>
            )}
            <span className="text-xs text-gray-500">{lastMessageTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate pr-2">
            {chat.lastMessagePreview || 'No messages yet'}
          </p>
          
          {/* Unread Count Badge */}
          {chat.unreadCount > 0 && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;