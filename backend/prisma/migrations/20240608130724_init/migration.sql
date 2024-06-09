/*
  Warnings:

  - You are about to drop the column `prerequisiteCode` on the `courseprerequisite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courseprerequisite` DROP FOREIGN KEY `CoursePrerequisite_prerequisite_fkey`;

-- AlterTable
ALTER TABLE `courseprerequisite` DROP COLUMN `prerequisiteCode`;
