export interface ClaimUsernameInput {
  userId: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: Date;
}
