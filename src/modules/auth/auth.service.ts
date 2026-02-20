import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type {
  ClaimUsernameInput,
  LoginInput,
  AuthResponse,
} from "./auth.types.js";
import {
  WeakPassword,
  WrongCredentials,
  UserNotFound,
} from "../auth/auth.errors.js";
import {
  findClaimedUser,
  findUserByID,
} from "../../application/queries/user.queries.js";
import { claimUsernameDB } from "../../application/use-cases/claim-username.use-case.js";
import { createSession } from "../../application/use-cases/create-session.use-case.js";
import { UsernameClaimedError } from "../../shared/errors/users.errors.js";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

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

  return createSession(user.id);
}

export async function claimUsername(input: ClaimUsernameInput) {
  const { userId, password } = input;

  if (password.length < 6) {
    throw new WeakPassword();
  }

  const user = await findUserByID(userId);

  if (!user) {
    throw new UserNotFound();
  }

  if (user.claimed) {
    throw new UsernameClaimedError(user.username);
  }

  const passwordHash = await argon2.hash(password);

  await claimUsernameDB(user.id, passwordHash);
}
