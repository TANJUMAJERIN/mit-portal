/*
  Warnings:

  - You are about to drop the `_electivecourseprerequisites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_finalcourselistprerequisites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courseprerequisite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_electivecourseprerequisites` DROP FOREIGN KEY `_ElectiveCoursePrerequisites_A_fkey`;

-- DropForeignKey
ALTER TABLE `_electivecourseprerequisites` DROP FOREIGN KEY `_ElectiveCoursePrerequisites_B_fkey`;

-- DropForeignKey
ALTER TABLE `_finalcourselistprerequisites` DROP FOREIGN KEY `_FinalCourseListPrerequisites_A_fkey`;

-- DropForeignKey
ALTER TABLE `_finalcourselistprerequisites` DROP FOREIGN KEY `_FinalCourseListPrerequisites_B_fkey`;

-- DropForeignKey
ALTER TABLE `courseprerequisite` DROP FOREIGN KEY `CoursePrerequisite_course_fkey`;

-- AlterTable
ALTER TABLE `electivecourse` ADD COLUMN `prerequisites` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `finalcourselist` ADD COLUMN `prerequisites` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `_electivecourseprerequisites`;

-- DropTable
DROP TABLE `_finalcourselistprerequisites`;

-- DropTable
DROP TABLE `courseprerequisite`;
