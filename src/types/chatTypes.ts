export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  status?: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  // Add fields for image/file URLs if needed later
}

export interface Chat {
  id: string;
  type: 'person' | 'ai';
  name: string;
  avatar?: string;
  messages: Message[];
  lastMessagePreview?: string;
  unreadCount: number;
  isOnline?: boolean; // For person type chats
} 