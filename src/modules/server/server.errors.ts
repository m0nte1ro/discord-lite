import { AppError } from "../../shared/lib/errors.js";

export class FailedToCreateServer extends AppError {
  constructor() {
    super(
      "Failed to create server.",
      500,
      "SERVER_FAILURE",
    );
  }
}
