-- CreateTable
CREATE TABLE `Course` (
    `course_code` VARCHAR(20) NOT NULL,
    `course_name` VARCHAR(255) NULL,

    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `registration_number` INTEGER NOT NULL,
    `payment_status` VARCHAR(10) NULL,

    PRIMARY KEY (`registration_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `registration_number` INTEGER NOT NULL,
    `marks` DECIMAL(5, 2) NULL,
    `course_name` VARCHAR(255) NULL,
    `CGPA` DECIMAL(3, 2) NULL,

    PRIMARY KEY (`registration_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `Password` VARCHAR(255) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrolled` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registration_number` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `session` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `designation` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registration_number` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `Student_registration_number_key`(`registration_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompletedCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseCode` VARCHAR(20) NOT NULL,

    INDEX `CompletedCourse_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrolledCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseCode` VARCHAR(20) NOT NULL,

    INDEX `EnrolledCourse_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ElectiveCourse` (
    `course_code` VARCHAR(20) NOT NULL,
    `course_name` VARCHAR(255) NULL,
    `currently_enrolled` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoursePrerequisite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseCode` VARCHAR(20) NOT NULL,
    `prerequisiteCode` VARCHAR(20) NOT NULL,
    `finalCourseListCode` VARCHAR(20) NOT NULL,

    INDEX `CoursePrerequisite_courseCode_idx`(`courseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalCourseList` (
    `course_code` VARCHAR(20) NOT NULL,
    `course_name` VARCHAR(255) NULL,
    `currently_enrolled` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompletedCourse` ADD CONSTRAINT `CompletedCourse_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrolledCourse` ADD CONSTRAINT `EnrolledCourse_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrerequisite` ADD CONSTRAINT `CoursePrerequisite_courseCode_fkey` FOREIGN KEY (`courseCode`) REFERENCES `ElectiveCourse`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrerequisite` ADD CONSTRAINT `CoursePrerequisite_finalCourseListCode_fkey` FOREIGN KEY (`finalCourseListCode`) REFERENCES `FinalCourseList`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
