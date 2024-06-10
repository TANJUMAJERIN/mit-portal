-- 20240608124238_add_unique_to_registration_number.sql

-- This is the problematic line, likely commented out or incorrectly written
--CREATE UNIQUE INDEX `students_registration_number_key` ON `students`(`registration_number`);

-- If you want to drop the index instead, you can add this line:
ALTER TABLE `students` DROP INDEX `students_registration_number_key`;
