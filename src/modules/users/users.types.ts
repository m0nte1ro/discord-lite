export interface CreateUserInput {
  username: string;
}

export interface UserResponse {
  id: string;
  username: string;
  displaySuffix: string;
  createdAt: Date;
  lastSeenAt: Date | null;
}

export interface ClaimUsernameInput {
  userId: string;
  password: string;
}
