/*
  Warnings:

  - Added the required column `expiresAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;
