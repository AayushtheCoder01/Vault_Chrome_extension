-- DropForeignKey
ALTER TABLE "UserPrefrences" DROP CONSTRAINT "UserPrefrences_userId_fkey";

-- AlterTable
ALTER TABLE "Vault" ADD COLUMN     "accountId" TEXT;

-- AddForeignKey
ALTER TABLE "UserPrefrences" ADD CONSTRAINT "UserPrefrences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
