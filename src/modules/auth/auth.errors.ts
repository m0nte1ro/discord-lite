import { AppError } from "../../shared/lib/errors.js";

export class WrongCredentials extends AppError {
  constructor() {
    super(
      "Failed to authenticate user with the provided credentials.",
      401,
      "WRONG_CREDENTIALS",
    );
  }
}

export class UserNotFound extends AppError {
  constructor() {
    super("Failed to fetch user data.", 500, "USER_NOT_FOUND");
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
