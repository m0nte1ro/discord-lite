import { AppError } from "../../shared/lib/errors.js";

export class FailedToCreateUserError extends AppError {
  constructor() {
    super(
      "Failed to create user after multiple attempts.",
      500,
      "USER_CREATION_FAILED",
    );
  }
}
