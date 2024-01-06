/*
  Warnings:

  - You are about to drop the column `relase_date` on the `movies` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `relase_date`,
    ADD COLUMN `release_date` VARCHAR(191) NOT NULL;
