import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadMessages: {},

  // Increment unread count for a user
  incrementUnreadCount: (userId) => set(state => ({
    unreadMessages: {
      ...state.unreadMessages,
      [userId]: (state.unreadMessages[userId] || 0) + 1,
    },
  })),

  // Reset unread count for a user
  resetUnreadCount: (userId) => set(state => ({
    unreadMessages: { ...state.unreadMessages, [userId]: 0 },
  })),

  // Fetch all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // Subscribe to real-time messages for the selected user
  subscribeToMessages: () => {
    const { selectedUser, incrementUnreadCount } = get();
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    
    if (!selectedUser || !socket || !authUser) return () => {};

    const handleNewMessage = (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
      if (newMessage.senderId !== authUser._id) {
        incrementUnreadCount(newMessage.senderId);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  },

  // Initialize global message listener
  initializeGlobalListeners: () => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    
    if (!socket || !authUser) {
      console.warn("Socket or user not available for global listeners");
      return () => {};
    }

    const { incrementUnreadCount } = get();
    
    const globalMessageHandler = (newMessage) => {
      if (newMessage.receiverId === authUser._id) {
        incrementUnreadCount(newMessage.senderId);
        if (!document.hasFocus() && Notification.permission === "granted") {
          new Notification(`New message from ${newMessage.senderName}`, {
            body: newMessage.text || "Attachment"
          });
        }
      }
    };

    socket.on("newMessage", globalMessageHandler);
    return () => socket.off("newMessage", globalMessageHandler);
  },

  // Cleanup all listeners
  cleanupGlobalListeners: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  // Set the selected user with cleanup
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (!selectedUser) {
      set({ messages: [] });
    }
  },
}));