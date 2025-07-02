import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  User, 
  Profile, 
  MitraApplication, 
  Order, 
  Transaction, 
  ChatMessage 
} from './storage';

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  PROFILES: 'profiles',
  MITRA_APPLICATIONS: 'mitra_applications',
  ORDERS: 'orders',
  TRANSACTIONS: 'transactions',
  CHAT_MESSAGES: 'chat_messages',
  BLOCKED_ACCOUNTS: 'blocked_accounts',
  CURRENT_USER: 'current_user'
};

export class FirebaseService {
  // Users
  async getUsers(): Promise<User[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
      return querySnapshot.docs.map(doc => doc.data() as User);
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.USERS), user);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async updateUser(email: string, userData: Partial<User>): Promise<void> {
    try {
      const q = query(collection(db, COLLECTIONS.USERS), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, userData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  // Profiles
  async getProfiles(): Promise<Profile[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROFILES));
      return querySnapshot.docs.map(doc => doc.data() as Profile);
    } catch (error) {
      console.error('Error getting profiles:', error);
      return [];
    }
  }

  async addProfile(profile: Profile): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.PROFILES), profile);
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  }

  async updateProfile(email: string, profileData: Partial<Profile>): Promise<void> {
    try {
      const q = query(collection(db, COLLECTIONS.PROFILES), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, profileData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  // Mitra Applications
  async getMitraApplications(): Promise<MitraApplication[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.MITRA_APPLICATIONS));
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      } as MitraApplication));
    } catch (error) {
      console.error('Error getting mitra applications:', error);
      return [];
    }
  }

  async addMitraApplication(application: MitraApplication): Promise<void> {
    try {
      const appData = {
        ...application,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, COLLECTIONS.MITRA_APPLICATIONS), appData);
    } catch (error) {
      console.error('Error adding mitra application:', error);
    }
  }

  async updateMitraApplication(id: string, applicationData: Partial<MitraApplication>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.MITRA_APPLICATIONS, id);
      await updateDoc(docRef, applicationData);
    } catch (error) {
      console.error('Error updating mitra application:', error);
    }
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.ORDERS));
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      } as Order));
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async addOrder(order: Order): Promise<void> {
    try {
      const orderData = {
        ...order,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, COLLECTIONS.ORDERS), orderData);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.ORDERS, id);
      await updateDoc(docRef, orderData);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.TRANSACTIONS));
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      } as Transaction));
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactionData = {
        ...transaction,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, COLLECTIONS.TRANSACTIONS), transactionData);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }

  async updateTransaction(id: string, transactionData: Partial<Transaction>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.TRANSACTIONS, id);
      await updateDoc(docRef, transactionData);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  }

  // Chat Messages
  async getChatMessages(): Promise<ChatMessage[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.CHAT_MESSAGES), orderBy('timestamp', 'asc'))
      );
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
      } as ChatMessage));
    } catch (error) {
      console.error('Error getting chat messages:', error);
      return [];
    }
  }

  async addChatMessage(message: ChatMessage): Promise<void> {
    try {
      const messageData = {
        ...message,
        timestamp: new Date().toISOString()
      };
      await addDoc(collection(db, COLLECTIONS.CHAT_MESSAGES), messageData);
    } catch (error) {
      console.error('Error adding chat message:', error);
    }
  }

  // Blocked Accounts
  async getBlockedAccounts(): Promise<string[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.BLOCKED_ACCOUNTS));
      return querySnapshot.docs.map(doc => doc.data().email);
    } catch (error) {
      console.error('Error getting blocked accounts:', error);
      return [];
    }
  }

  async addBlockedAccount(email: string): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.BLOCKED_ACCOUNTS), { email });
    } catch (error) {
      console.error('Error adding blocked account:', error);
    }
  }

  async removeBlockedAccount(email: string): Promise<void> {
    try {
      const q = query(collection(db, COLLECTIONS.BLOCKED_ACCOUNTS), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.docs.forEach(async (docSnapshot) => {
        await deleteDoc(docSnapshot.ref);
      });
    } catch (error) {
      console.error('Error removing blocked account:', error);
    }
  }

  // Current User Session
  async getCurrentUser(): Promise<string | null> {
    try {
      // For now, we'll still use localStorage for current user session
      // since Firebase Auth would be more complex to implement
      return localStorage.getItem('currentUser');
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async setCurrentUser(email: string): Promise<void> {
    try {
      localStorage.setItem('currentUser', email);
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  async clearCurrentUser(): Promise<void> {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  }

  // Initialize default admin account
  async initializeDefaultAccounts(): Promise<void> {
    try {
      const users = await this.getUsers();
      const profiles = await this.getProfiles();
      
      // Create admin account if it doesn't exist
      const adminExists = users.find(u => u.email === 'id.getlife@gmail.com');
      if (!adminExists) {
        await this.addUser({
          email: 'id.getlife@gmail.com',
          password: 'Bandung123',
          role: 'admin'
        });
        
        await this.addProfile({
          email: 'id.getlife@gmail.com',
          name: 'Admin GetLife',
          role: 'admin',
          status: 'active',
          saldo: 0
        });
      }
    } catch (error) {
      console.error('Error initializing default accounts:', error);
    }
  }
}

export const firebaseService = new FirebaseService();