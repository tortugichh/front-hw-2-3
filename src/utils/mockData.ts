import type { Chat } from '../types/chatTypes';

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    type: 'person',
    name: 'Salam ALeikum',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFKVZKY3RMKyA/profile-displayphoto-shrink_200_200/B56ZSTx.izHoAY-/0/1737646140388?e=1754524800&v=beta&t=2qgo88IVFKnhmVB464IIVa0iYdvExiu2WncBjee3M7Y',
    messages: [
      { 
        id: 'msg-1', 
        sender: 'user', 
        text: 'Hey Sarah! How was your weekend?', 
        timestamp: Date.now() - 7200000, 
        type: 'text', 
        status: 'read' 
      },
      { 
        id: 'msg-2', 
        sender: 'user', 
        text: 'It was amazing! Went hiking in the mountains 🏔️', 
        timestamp: Date.now() - 7100000, 
        type: 'text', 
        status: 'read' 
      },
      { 
        id: 'msg-3', 
        sender: 'user', 
        text: 'The views were absolutely breathtaking. You should come with us next time!', 
        timestamp: Date.now() - 7000000, 
        type: 'text', 
        status: 'read' 
      },
      { 
        id: 'msg-4', 
        sender: 'user', 
        text: 'Definitely! I\'ve been wanting to get more into outdoor activities', 
        timestamp: Date.now() - 3600000, 
        type: 'text', 
        status: 'delivered' 
      },
    ],
    lastMessagePreview: "Definitely! I've been wanting to get more into outdoor activities",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'chat-2',
    type: 'ai',
    name: 'AI Assistant',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFKVZKY3RMKyA/profile-displayphoto-shrink_200_200/B56ZSTx.izHoAY-/0/1737646140388?e=1754524800&v=beta&t=2qgo88IVFKnhmVB464IIVa0iYdvExiu2WncBjee3M7Y',
    messages: [
      
    ],
    lastMessagePreview: "Ask me anything",
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    type: 'person',
    name: 'Ualeikum',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFKVZKY3RMKyA/profile-displayphoto-shrink_200_200/B56ZSTx.izHoAY-/0/1737646140388?e=1754524800&v=beta&t=2qgo88IVFKnhmVB464IIVa0iYdvExiu2WncBjee3M7Y',
    messages: [
      { 
        id: 'msg-8', 
        sender: 'user', 
        text: 'Hey Mike! Are we still on for the meeting tomorrow?', 
        timestamp: Date.now() - 10800000, 
        type: 'text', 
        status: 'delivered' 
      },
      { 
        id: 'msg-9', 
        sender: 'user', 
        text: 'Yes, 2 PM at the usual place. See you there! 👍', 
        timestamp: Date.now() - 9000000, 
        type: 'text', 
        status: 'sent' 
      },
    ],
    lastMessagePreview: "Yes, 2 PM at the usual place. See you there! 👍",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'chat-4',
    type: 'ai',
    name: 'AI Assistant #2',
    avatar: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=100&h=100&fit=crop',
    messages: [
      
    ],
    lastMessagePreview: "Ask me smth",
    unreadCount: 0,
  },
  {
    id: 'chat-5',
    type: 'person',
    name: 'Omar Sembek',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFKVZKY3RMKyA/profile-displayphoto-shrink_200_200/B56ZSTx.izHoAY-/0/1737646140388?e=1754524800&v=beta&t=2qgo88IVFKnhmVB464IIVa0iYdvExiu2WncBjee3M7Y',
    messages: [
      { 
        id: 'msg-12', 
        sender: 'user', 
        text: 'Thanks for the book recommendation! 📚', 
        timestamp: Date.now() - 86400000, // 1 day ago
        type: 'text', 
        status: 'read' 
      },
      { 
        id: 'msg-13', 
        sender: 'user', 
        text: 'You\'re welcome! Did you start reading it yet?', 
        timestamp: Date.now() - 82800000, 
        type: 'text', 
        status: 'read' 
      },
    ],
    lastMessagePreview: "You're welcome! Did you start reading it yet?",
    unreadCount: 0,
    isOnline: true,
  },
  
  {
    id: 'chat-6',
    type: 'person',
    name: 'Omar Hayam',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    messages: [
      { 
        id: 'msg-14', 
        sender: 'user', 
        text: 'Happy birthday Dad! 🎉🎂', 
        timestamp: Date.now() - 172800000, // 2 days ago
        type: 'text', 
        status: 'read' 
      },
      { 
        id: 'msg-15', 
        sender: 'user', 
        text: 'Thank you so much! The surprise party was wonderful ❤️', 
        timestamp: Date.now() - 169200000, 
        type: 'text', 
        status: 'read' 
      },
    ],
    lastMessagePreview: "Thank you so much! The surprise party was wonderful ❤️",
    unreadCount: 0,
    isOnline: false,
  },
];