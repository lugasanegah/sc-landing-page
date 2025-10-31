// Auth domain types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: number;
  username: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
}