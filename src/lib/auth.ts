
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

        return {
            user: userWithoutPassword as AuthResponse['user'],
            token: 'mock-jwt-token-' + Date.now()
        };
    }
};
