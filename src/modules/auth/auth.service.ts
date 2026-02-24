import argon2 from "argon2";
import type { LoginInput, AuthResponse } from "./auth.types.js";
import { WrongCredentials } from "../auth/auth.errors.js";
import { findClaimedUser } from "../../application/queries/user.queries.js";
import { createSession } from "../../application/use-cases/create-session.use-case.js";

export async function login(input: LoginInput): Promise<AuthResponse> {
  const { username, password } = input;
  const user = await findClaimedUser(username);

  if (!user || !user.password) {
    throw new WrongCredentials();
  }

  const passwordMatches = await argon2.verify(user.password, password);

  if (!passwordMatches) {
    throw new WrongCredentials();
  }

  return await createSession(user.id);
}
