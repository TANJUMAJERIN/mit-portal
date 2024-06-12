CREATE INDEX `CourseEnrollment_coursecode_idx` ON `CourseEnrollment`(`coursecode`);
DROP INDEX `CourseEnrollment_coursecode_fkey` ON `CourseEnrollment`;

CREATE INDEX `CourseEnrollment_roll_idx` ON `CourseEnrollment`(`roll`);
DROP INDEX `CourseEnrollment_roll_fkey` ON `CourseEnrollment`;
