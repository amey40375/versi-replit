export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'mitra';
}

export interface Profile {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'user' | 'mitra';
  status: 'active' | 'verified' | 'blocked';
  saldo: number;
  expertise?: 'GetClean' | 'GetMassage' | 'GetBarber';
}

export interface MitraApplication {
  id: string;
  nama: string;
  phone: string;
  address: string;
  expertise: 'GetClean' | 'GetMassage' | 'GetBarber';
  reason: string;
  ktpPhoto?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  mitraId: string;
  service: 'GetClean' | 'GetMassage' | 'GetBarber';
  status: 'menunggu' | 'dikerjakan' | 'selesai' | 'dibatalkan';
  startTime?: string;
  endTime?: string;
  totalCost?: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName?: string;
  type: 'topup' | 'payment';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  transferProof?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  message: string;
  timestamp: string;
}

import { firebaseService } from './firebaseService';

// Storage utilities - now using Firebase
export const storage = {
  getUsers: async (): Promise<User[]> => {
    return await firebaseService.getUsers();
  },
  
  setUsers: async (users: User[]): Promise<void> => {
    // This method is deprecated - use addUser instead
    console.warn('setUsers is deprecated, use addUser for individual users');
  },
  
  addUser: async (user: User): Promise<void> => {
    await firebaseService.addUser(user);
  },
  
  getProfiles: async (): Promise<Profile[]> => {
    return await firebaseService.getProfiles();
  },
  
  setProfiles: async (profiles: Profile[]): Promise<void> => {
    // This method is deprecated - use addProfile instead
    console.warn('setProfiles is deprecated, use addProfile for individual profiles');
  },
  
  addProfile: async (profile: Profile): Promise<void> => {
    await firebaseService.addProfile(profile);
  },
  
  updateProfile: async (email: string, profileData: Partial<Profile>): Promise<void> => {
    await firebaseService.updateProfile(email, profileData);
  },
  
  getMitraApplications: async (): Promise<MitraApplication[]> => {
    return await firebaseService.getMitraApplications();
  },
  
  setMitraApplications: async (applications: MitraApplication[]): Promise<void> => {
    // This method is deprecated - use addMitraApplication instead
    console.warn('setMitraApplications is deprecated, use addMitraApplication for individual applications');
  },
  
  addMitraApplication: async (application: MitraApplication): Promise<void> => {
    await firebaseService.addMitraApplication(application);
  },
  
  updateMitraApplication: async (id: string, applicationData: Partial<MitraApplication>): Promise<void> => {
    await firebaseService.updateMitraApplication(id, applicationData);
  },
  
  getOrders: async (): Promise<Order[]> => {
    return await firebaseService.getOrders();
  },
  
  setOrders: async (orders: Order[]): Promise<void> => {
    // This method is deprecated - use addOrder instead
    console.warn('setOrders is deprecated, use addOrder for individual orders');
  },
  
  addOrder: async (order: Order): Promise<void> => {
    await firebaseService.addOrder(order);
  },
  
  updateOrder: async (id: string, orderData: Partial<Order>): Promise<void> => {
    await firebaseService.updateOrder(id, orderData);
  },
  
  getTransactions: async (): Promise<Transaction[]> => {
    return await firebaseService.getTransactions();
  },
  
  setTransactions: async (transactions: Transaction[]): Promise<void> => {
    // This method is deprecated - use addTransaction instead
    console.warn('setTransactions is deprecated, use addTransaction for individual transactions');
  },
  
  addTransaction: async (transaction: Transaction): Promise<void> => {
    await firebaseService.addTransaction(transaction);
  },
  
  updateTransaction: async (id: string, transactionData: Partial<Transaction>): Promise<void> => {
    await firebaseService.updateTransaction(id, transactionData);
  },
  
  getBlockedAccounts: async (): Promise<string[]> => {
    return await firebaseService.getBlockedAccounts();
  },
  
  setBlockedAccounts: async (emails: string[]): Promise<void> => {
    // This method is deprecated - use addBlockedAccount instead
    console.warn('setBlockedAccounts is deprecated, use addBlockedAccount for individual accounts');
  },
  
  addBlockedAccount: async (email: string): Promise<void> => {
    await firebaseService.addBlockedAccount(email);
  },
  
  removeBlockedAccount: async (email: string): Promise<void> => {
    await firebaseService.removeBlockedAccount(email);
  },
  
  getChatMessages: async (): Promise<ChatMessage[]> => {
    return await firebaseService.getChatMessages();
  },
  
  setChatMessages: async (messages: ChatMessage[]): Promise<void> => {
    // This method is deprecated - use addChatMessage instead
    console.warn('setChatMessages is deprecated, use addChatMessage for individual messages');
  },
  
  addChatMessage: async (message: ChatMessage): Promise<void> => {
    await firebaseService.addChatMessage(message);
  },
  
  getCurrentUser: (): string | null => {
    return localStorage.getItem('currentUser');
  },
  
  setCurrentUser: (email: string) => {
    localStorage.setItem('currentUser', email);
  },
  
  clearCurrentUser: () => {
    localStorage.removeItem('currentUser');
  }
};

// Initialize default admin account - now async
export const initializeDefaultAccounts = async () => {
  await firebaseService.initializeDefaultAccounts();
};
