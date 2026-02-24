import argon2 from "argon2";
import * as usersRepository from "./users.repository.js";
import { FailedToCreateUserError, WeakPassword } from "./users.errors.js";
import type {
  CreateUserInput,
  UserResponse,
  ClaimUsernameInput,
} from "./users.types.js";
import { generateSuffix } from "../../shared/utils/generateSuffix.js";
import {
  UsernameClaimedError,
  UserNotFound,
} from "../../shared/errors/users.errors.js";
import { findClaimedUser } from "../../application/queries/user.queries.js";
import { createSession } from "../../application/use-cases/create-session.use-case.js";

export async function createUser(
  input: CreateUserInput,
): Promise<UserResponse> {
  const { username } = input;

  // Business rule:
  // If username is already claimed, do not allow new users
  const usernameIsClaimed = await findClaimedUser(username);

  if (usernameIsClaimed) {
    throw new UsernameClaimedError(username);
  }

  // Try until we get a unique suffix
  let user;
  let attempts = 0;
  while (!user) {
    try {
      const suffix = generateSuffix();

      user = await usersRepository.createGuestUser(username, suffix);
    } catch (err: any) {
      // Prisma unique constraint error
      if (err.code !== "P2002") {
        throw err;
      }
    }

    attempts++;

    if (attempts > 5) {
      throw new FailedToCreateUserError();
    }
  }

  let session = await createSession(user.id);

  return {
    id: user.id,
    username: user.username,
    displaySuffix: user.displaySuffix,
    createdAt: user.createdAt,
    lastSeenAt: user.lastSeenAt,
    token: session.token,
    expiresAt: session.expiresAt,
  };
}

export async function claimUsername(input: ClaimUsernameInput) {
  const { userId, password } = input;

  if (password.length < 6) {
    throw new WeakPassword();
  }

  const user = await usersRepository.findUserByID(userId);

  if (!user) {
    throw new UserNotFound();
  }

  if (user.claimed) {
    throw new UsernameClaimedError(user.username);
  }

  const passwordHash = await argon2.hash(password);

  await usersRepository.claimUsernameDB(user.id, passwordHash);
}
