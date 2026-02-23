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

export class WeakPassword extends AppError {
  constructor() {
    super(
      "The given password doesn't meet the required standards.",
      422,
      "WEAK_PASSWORD",
    );
  }
}
