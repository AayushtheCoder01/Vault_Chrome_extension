/*
  Warnings:

  - You are about to drop the column `prefrenceId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserPrefrences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserPrefrences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_prefrenceId_fkey";

-- DropIndex
DROP INDEX "User_prefrenceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "prefrenceId",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserPrefrences" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vault" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserPrefrences_userId_key" ON "UserPrefrences"("userId");

-- AddForeignKey
ALTER TABLE "UserPrefrences" ADD CONSTRAINT "UserPrefrences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
