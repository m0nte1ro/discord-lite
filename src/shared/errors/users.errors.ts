import { AppError } from "../../shared/lib/errors.js";

export class UsernameClaimedError extends AppError {
  constructor(username: string) {
    super(
      `Username "${username}" is already claimed.`,
      409,
      "USERNAME_CLAIMED",
    );
  }
}

export class UserNotFound extends AppError {
  constructor() {
    super("Failed to fetch user data.", 500, "USER_NOT_FOUND");
  }
}
