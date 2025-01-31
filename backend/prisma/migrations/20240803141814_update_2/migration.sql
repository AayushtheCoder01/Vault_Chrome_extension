/*
  Warnings:

  - Added the required column `userId` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vault" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vault" ADD CONSTRAINT "Vault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
