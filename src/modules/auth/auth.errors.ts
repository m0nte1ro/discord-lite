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
