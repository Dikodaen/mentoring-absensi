
// Mock user data
// In a real application, this would come from a database API
const MOCK_USERS = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'password', // In real app: hashed
        role: 'admin'
    },
    {
        id: '2',
        name: 'Jainudin Ambari',
        email: 'jainudin@gmail.com',
        password: 'password',
        role: 'karyawan'
    },
    {
        id: '3',
        name: 'Maryam Azizah',
        email: 'maryam@gmail.com',
        password: 'password',
        role: 'karyawan'
    }
];

export type UserRole = 'admin' | 'karyawan';

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    };
    token: string;
}

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = MOCK_USERS.find(u => u.email === email);

        if (!user) {
            throw new Error("Akun tidak ditemukan");
        }

        if (user.password !== password) {
            throw new Error("Password salah");
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        const response = {
            user: userWithoutPassword as AuthResponse['user'],
            token: 'mock-jwt-token-' + Date.now()
        };

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user_session', JSON.stringify(response.user));
        }

        return response;
    },

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_session');
        }
    },

    getUser() {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user_session');
            if (userStr) return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated() {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('auth_token');
        }
        return false;
    }
};
