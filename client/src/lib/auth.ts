import { storage, initializeDefaultAccounts } from './hybridStorage';

export const auth = {
  login: async (email: string, password: string) => {
    const users = await storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Email atau password salah' };
    }
    
    // Check if account is blocked (for mitra)
    if (user.role === 'mitra') {
      const blocked = await storage.getBlockedAccounts();
      if (blocked.includes(email)) {
        return { success: false, message: 'Akun Anda diblokir. Hubungi admin.' };
      }
      
      // Check if mitra is verified
      const profiles = await storage.getProfiles();
      const profile = profiles.find(p => p.email === email);
      if (profile && profile.status !== 'verified') {
        return { success: false, message: 'Akun mitra belum diverifikasi' };
      }
    }
    
    storage.setCurrentUser(email);
    return { success: true, user };
  },
  
  logout: () => {
    storage.clearCurrentUser();
  },
  
  getCurrentUser: async () => {
    const email = storage.getCurrentUser();
    if (!email) return null;
    
    const users = await storage.getUsers();
    const profiles = await storage.getProfiles();
    const user = users.find(u => u.email === email);
    const profile = profiles.find(p => p.email === email);
    
    return user && profile ? { ...user, ...profile } : null;
  },
  
  register: async (email: string, password: string, name: string, role: 'user' | 'mitra') => {
    const users = await storage.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email sudah terdaftar' };
    }
    
    const newUser = { email, password, role };
    const newProfile = {
      email,
      name,
      role,
      status: 'active' as const,
      saldo: 0
    };
    
    await storage.addUser(newUser);
    await storage.addProfile(newProfile);
    
    return { success: true };
  }
};

// Initialize on import - async
(async () => {
  await initializeDefaultAccounts();
})();