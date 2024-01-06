-- CreateTable
CREATE TABLE `Movies` (
    `movie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_name` VARCHAR(191) NOT NULL,
    `relase_date` VARCHAR(191) NOT NULL,
    `avg_rating` INTEGER NULL,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewer_name` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL,
    `review_text` VARCHAR(191) NOT NULL,
    `movieId` INTEGER NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movies`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
