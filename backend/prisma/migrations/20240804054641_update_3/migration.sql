/*
  Warnings:

  - A unique constraint covering the columns `[prefrenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "prefrenceId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "UserPrefrences" (
    "id" SERIAL NOT NULL,
    "emailUpdate" BOOLEAN NOT NULL DEFAULT true,
    "theme" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserPrefrences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_prefrenceId_key" ON "User"("prefrenceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_prefrenceId_fkey" FOREIGN KEY ("prefrenceId") REFERENCES "UserPrefrences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
