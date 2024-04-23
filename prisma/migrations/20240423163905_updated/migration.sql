/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `user_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_sessions_user_id_key` ON `user_sessions`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_sessions_token_key` ON `user_sessions`(`token`);
