/*
  Warnings:

  - A unique constraint covering the columns `[username,display_suffix]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_username_display_suffix_key" ON "users"("username", "display_suffix");
