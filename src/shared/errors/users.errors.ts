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
