-- AlterTable
ALTER TABLE `student` ADD PRIMARY KEY (`registration_number`);

-- RedefineIndex
CREATE INDEX `CourseEnrollment_coursecode_idx` ON `CourseEnrollment`(`coursecode`);
DROP INDEX `CourseEnrollment_coursecode_fkey` ON `courseenrollment`;

-- RedefineIndex
CREATE INDEX `CourseEnrollment_roll_idx` ON `CourseEnrollment`(`roll`);
DROP INDEX `CourseEnrollment_roll_fkey` ON `courseenrollment`;
