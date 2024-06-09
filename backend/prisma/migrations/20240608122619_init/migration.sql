/*
  Warnings:

  - You are about to drop the column `finalCourseListCode` on the `courseprerequisite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courseprerequisite` DROP FOREIGN KEY `CoursePrerequisite_courseCode_fkey`;

-- DropForeignKey
ALTER TABLE `courseprerequisite` DROP FOREIGN KEY `CoursePrerequisite_finalCourseListCode_fkey`;

-- AlterTable
ALTER TABLE `courseprerequisite` DROP COLUMN `finalCourseListCode`;

-- CreateTable
CREATE TABLE `_ElectiveCoursePrerequisites` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `_ElectiveCoursePrerequisites_AB_unique`(`A`, `B`),
    INDEX `_ElectiveCoursePrerequisites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FinalCourseListPrerequisites` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `_FinalCourseListPrerequisites_AB_unique`(`A`, `B`),
    INDEX `_FinalCourseListPrerequisites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CoursePrerequisite_prerequisiteCode_idx` ON `CoursePrerequisite`(`prerequisiteCode`);

-- AddForeignKey
ALTER TABLE `CoursePrerequisite` ADD CONSTRAINT `CoursePrerequisite_course_fkey` FOREIGN KEY (`courseCode`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrerequisite` ADD CONSTRAINT `CoursePrerequisite_prerequisite_fkey` FOREIGN KEY (`prerequisiteCode`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ElectiveCoursePrerequisites` ADD CONSTRAINT `_ElectiveCoursePrerequisites_A_fkey` FOREIGN KEY (`A`) REFERENCES `CoursePrerequisite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ElectiveCoursePrerequisites` ADD CONSTRAINT `_ElectiveCoursePrerequisites_B_fkey` FOREIGN KEY (`B`) REFERENCES `ElectiveCourse`(`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FinalCourseListPrerequisites` ADD CONSTRAINT `_FinalCourseListPrerequisites_A_fkey` FOREIGN KEY (`A`) REFERENCES `CoursePrerequisite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FinalCourseListPrerequisites` ADD CONSTRAINT `_FinalCourseListPrerequisites_B_fkey` FOREIGN KEY (`B`) REFERENCES `FinalCourseList`(`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;
