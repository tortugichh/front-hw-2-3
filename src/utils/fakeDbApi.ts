import fakeDb from './fakeDb.json';
import type { Message } from '../types/chatTypes';

interface RawFakeDbMessage {
  id: string;
  sender: string; // Allow string for raw data from JSON
  text: string;
  timestamp: number;
  status?: string; // Allow string for raw data from JSON
  type: string; // Allow string for raw data from JSON
}

interface RawFakeDbChatData {
  chatId: string;
  messages: RawFakeDbMessage[];
}

/**
 * Simulates fetching chat messages for a specific chat ID from the fake database.
 * Maps raw data to the Message interface.
 * @param chatId The ID of the chat.
 * @returns A promise that resolves with the chat data or undefined if not found.
 */
export const fetchChatMessagesFromFakeDb = async (chatId: string): Promise<{ chatId: string; messages: Message[] } | undefined> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const chatData: RawFakeDbChatData | undefined = fakeDb.find(chat => chat.chatId === chatId);
      
      if (chatData) {
        const messages: Message[] = chatData.messages.map(rawMsg => ({
          id: rawMsg.id,
          sender: rawMsg.sender === 'other' ? 'ai' : (rawMsg.sender as 'user' | 'ai'), // Map 'other' to 'ai'
          text: rawMsg.text,
          timestamp: rawMsg.timestamp,
          status: rawMsg.status as 'sent' | 'delivered' | 'read' | undefined, // Cast status
          type: rawMsg.type as 'text' | 'image' | 'file', // Cast type
        }));
        resolve({ chatId: chatData.chatId, messages });
      } else {
        resolve(undefined);
      }
    }, 500); // Simulate a 500ms delay
  });
};

/**
 * Simulates getting a predefined response from the fake database for a given chat and message.
 * This is a simplified example and would need more complex logic for real AI/predefined responses.
 * @param chatId The ID of the chat.
 * @param userMessage The message sent by the user.
 * @returns A promise that resolves with a simulated AI response or undefined.
 */
export const getFakeDbResponse = async (chatId: string, userMessage: string): Promise<Message | undefined> => {
   return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      const chatData: RawFakeDbChatData | undefined = fakeDb.find(chat => chat.chatId === chatId);
      
      if (chatData && chatData.messages.length > 0) {
          const lastMessageIndex = chatData.messages.findIndex(rawMsg => rawMsg.text === userMessage && rawMsg.sender === 'user');
          if (lastMessageIndex !== -1 && lastMessageIndex < chatData.messages.length -1) {
              const nextRawMessage = chatData.messages[lastMessageIndex + 1];
               resolve({
                  id: Date.now().toString(),
                  sender: nextRawMessage.sender === 'other' ? 'ai' : (nextRawMessage.sender as 'user' | 'ai'), // Map 'other' to 'ai'
                  text: nextRawMessage.text,
                  timestamp: Date.now(),
                  type: nextRawMessage.type as 'text' | 'image' | 'file',
                  status: 'sent' // Simulate initial sent status
              });
              return;
          }
      }

      // Fallback generic response if no specific match or history is found
      resolve(undefined);

    }, 300); // Simulate a 300ms processing delay
  });
}; 