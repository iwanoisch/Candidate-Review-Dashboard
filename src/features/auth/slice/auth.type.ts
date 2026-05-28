export type UserRole = 'admin' | 'viewer';

export interface User {
    id: string;
    role: UserRole;
    first_name: string;
    last_name: string;
    email: string;
    name: string;
    short_name: string;
    avatar: string;
    picture?: string;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: Partial<User> | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
