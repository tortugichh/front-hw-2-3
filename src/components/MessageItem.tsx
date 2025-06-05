import React from 'react';
import type { Message } from '../types/chatTypes';
import { Check, CheckCheck } from 'lucide-react';

interface MessageItemProps {
  message: Message;
  isConsecutive?: boolean;
}

function MessageItem({ message, isConsecutive = false }: MessageItemProps) {
  const isOutgoing = message.sender === 'user';

  // Message bubble styles
  const messageClasses = isOutgoing
    ? "bg-blue-400 text-white rounded-lg rounded-br-sm"
    : "bg-gray-100 text-gray-800 rounded-lg rounded-bl-sm";

  const alignmentClasses = isOutgoing ? "justify-end" : "justify-start";

  // Format timestamp
  const messageDate = new Date(message.timestamp);
  const hours = messageDate.getHours().toString().padStart(2, '0');
  const minutes = messageDate.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  // Status icon styling
  const getStatusIcon = () => {
    if (!isOutgoing || !message.status) return null;
    
    const iconClass = message.status === 'read' ? "text-white" : "text-gray-200 opacity-80";
    
    switch (message.status) {
      case 'sent':
        return <Check size={12} className={iconClass} />;
      case 'delivered':
        return <CheckCheck size={12} className={iconClass} />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${alignmentClasses} ${isConsecutive ? 'mb-1' : 'mb-3'}`}>
      <div className={`${messageClasses} px-3 py-2 max-w-xs lg:max-w-md xl:max-w-lg break-words`}>
        {/* Message Text */}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.text}
        </div>
        
        {/* Message Footer */}
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className={`text-xs ${isOutgoing ? 'text-white opacity-80' : 'text-gray-600'}`}>
            {formattedTime}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}

export default MessageItem;