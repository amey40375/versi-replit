// Hybrid storage that falls back to localStorage when Firebase is not available
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

// Local Storage functions for fallback
const localStorageUtils = {
  getUsers: (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },
  
  setUsers: (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  getProfiles: (): Profile[] => {
    const profiles = localStorage.getItem('profiles');
    return profiles ? JSON.parse(profiles) : [];
  },
  
  setProfiles: (profiles: Profile[]) => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  },
  
  getMitraApplications: (): MitraApplication[] => {
    const apps = localStorage.getItem('mitra_applications');
    return apps ? JSON.parse(apps) : [];
  },
  
  setMitraApplications: (applications: MitraApplication[]) => {
    localStorage.setItem('mitra_applications', JSON.stringify(applications));
  },
  
  getOrders: (): Order[] => {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  },
  
  setOrders: (orders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(orders));
  },
  
  getTransactions: (): Transaction[] => {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  },
  
  setTransactions: (transactions: Transaction[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  },
  
  getBlockedAccounts: (): string[] => {
    const blocked = localStorage.getItem('blocked_accounts');
    return blocked ? JSON.parse(blocked) : [];
  },
  
  setBlockedAccounts: (emails: string[]) => {
    localStorage.setItem('blocked_accounts', JSON.stringify(emails));
  },
  
  getChatMessages: (): ChatMessage[] => {
    const messages = localStorage.getItem('chat_messages');
    return messages ? JSON.parse(messages) : [];
  },
  
  setChatMessages: (messages: ChatMessage[]) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }
};

// Firebase connection test
let firebaseAvailable = false;

// Test Firebase connectivity
const testFirebaseConnection = async () => {
  try {
    const { firebaseService } = await import('./firebaseService');
    await firebaseService.getUsers();
    firebaseAvailable = true;
    console.log('Firebase connection successful');
    return true;
  } catch (error) {
    firebaseAvailable = false;
    console.log('Firebase not available, using localStorage fallback');
    return false;
  }
};

// Hybrid storage that tries Firebase first, falls back to localStorage
export const storage = {
  // Initialize connection test
  init: async () => {
    await testFirebaseConnection();
  },

  getUsers: async (): Promise<User[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getUsers();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getUsers();
  },
  
  addUser: async (user: User): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addUser(user);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const users = localStorageUtils.getUsers();
    localStorageUtils.setUsers([...users, user]);
  },
  
  getProfiles: async (): Promise<Profile[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getProfiles();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getProfiles();
  },
  
  addProfile: async (profile: Profile): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addProfile(profile);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const profiles = localStorageUtils.getProfiles();
    localStorageUtils.setProfiles([...profiles, profile]);
  },
  
  updateProfile: async (email: string, profileData: Partial<Profile>): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.updateProfile(email, profileData);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const profiles = localStorageUtils.getProfiles();
    const updatedProfiles = profiles.map(p => 
      p.email === email ? { ...p, ...profileData } : p
    );
    localStorageUtils.setProfiles(updatedProfiles);
  },
  
  getMitraApplications: async (): Promise<MitraApplication[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getMitraApplications();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getMitraApplications();
  },
  
  addMitraApplication: async (application: MitraApplication): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addMitraApplication(application);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const applications = localStorageUtils.getMitraApplications();
    localStorageUtils.setMitraApplications([...applications, application]);
  },
  
  updateMitraApplication: async (id: string, applicationData: Partial<MitraApplication>): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.updateMitraApplication(id, applicationData);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const applications = localStorageUtils.getMitraApplications();
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, ...applicationData } : app
    );
    localStorageUtils.setMitraApplications(updatedApplications);
  },
  
  getOrders: async (): Promise<Order[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getOrders();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getOrders();
  },
  
  addOrder: async (order: Order): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addOrder(order);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const orders = localStorageUtils.getOrders();
    localStorageUtils.setOrders([...orders, order]);
  },
  
  updateOrder: async (id: string, orderData: Partial<Order>): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.updateOrder(id, orderData);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const orders = localStorageUtils.getOrders();
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, ...orderData } : order
    );
    localStorageUtils.setOrders(updatedOrders);
  },
  
  getTransactions: async (): Promise<Transaction[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getTransactions();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getTransactions();
  },
  
  addTransaction: async (transaction: Transaction): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addTransaction(transaction);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const transactions = localStorageUtils.getTransactions();
    localStorageUtils.setTransactions([...transactions, transaction]);
  },
  
  updateTransaction: async (id: string, transactionData: Partial<Transaction>): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.updateTransaction(id, transactionData);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const transactions = localStorageUtils.getTransactions();
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === id ? { ...transaction, ...transactionData } : transaction
    );
    localStorageUtils.setTransactions(updatedTransactions);
  },
  
  getBlockedAccounts: async (): Promise<string[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getBlockedAccounts();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getBlockedAccounts();
  },
  
  addBlockedAccount: async (email: string): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addBlockedAccount(email);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const blocked = localStorageUtils.getBlockedAccounts();
    if (!blocked.includes(email)) {
      localStorageUtils.setBlockedAccounts([...blocked, email]);
    }
  },
  
  removeBlockedAccount: async (email: string): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.removeBlockedAccount(email);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const blocked = localStorageUtils.getBlockedAccounts();
    localStorageUtils.setBlockedAccounts(blocked.filter(b => b !== email));
  },
  
  getChatMessages: async (): Promise<ChatMessage[]> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        return await firebaseService.getChatMessages();
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    return localStorageUtils.getChatMessages();
  },
  
  addChatMessage: async (message: ChatMessage): Promise<void> => {
    if (firebaseAvailable) {
      try {
        const { firebaseService } = await import('./firebaseService');
        await firebaseService.addChatMessage(message);
        return;
      } catch (error) {
        console.log('Firebase error, falling back to localStorage');
        firebaseAvailable = false;
      }
    }
    
    const messages = localStorageUtils.getChatMessages();
    localStorageUtils.setChatMessages([...messages, message]);
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

// Initialize default admin account
export const initializeDefaultAccounts = async () => {
  await storage.init(); // Test Firebase connection
  
  const users = await storage.getUsers();
  const profiles = await storage.getProfiles();
  
  // Create admin account if it doesn't exist
  const adminExists = users.find(u => u.email === 'id.getlife@gmail.com');
  if (!adminExists) {
    await storage.addUser({
      email: 'id.getlife@gmail.com',
      password: 'Bandung123',
      role: 'admin'
    });
    
    await storage.addProfile({
      email: 'id.getlife@gmail.com',
      name: 'Admin GetLife',
      role: 'admin',
      status: 'active',
      saldo: 0
    });
  }
};