/*
  Warnings:

  - Added the required column `semester` to the `CourseEnrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `CourseEnrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courseenrollment` ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    ADD COLUMN `session` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MarksheetData` ADD CONSTRAINT `MarksheetData_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course`(`coursecode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_coursecode_fkey` FOREIGN KEY (`coursecode`) REFERENCES `Course`(`coursecode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedCourse` ADD CONSTRAINT `SelectedCourse_coursecode_fkey` FOREIGN KEY (`coursecode`) REFERENCES `Course`(`coursecode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `Students_registration_number_key` ON `Students`(`registration_number`);
DROP INDEX `students_registration_number_key` ON `students`;
