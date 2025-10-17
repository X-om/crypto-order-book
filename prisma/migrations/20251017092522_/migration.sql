/*
  Warnings:

  - You are about to drop the column `otp` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `action` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OTP_TYPE" AS ENUM ('LOGIN', 'PASSWORD_RESET', 'EMAIL_VERIFICATION');

-- CreateEnum
CREATE TYPE "OTP_ACTION" AS ENUM ('CREATE', 'VERIFY', 'EXPIRE');

-- DropIndex
DROP INDEX "public"."Otp_userId_key";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "otp",
ADD COLUMN     "action" "OTP_ACTION" NOT NULL,
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "success" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "OTP_TYPE" NOT NULL;

-- CreateIndex
CREATE INDEX "Otp_userId_idx" ON "Otp"("userId");

-- CreateIndex
CREATE INDEX "Otp_email_idx" ON "Otp"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
