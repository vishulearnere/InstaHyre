-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `passsword` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_phoneNo_key`(`phoneNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `globalUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `spam` BOOLEAN NULL DEFAULT false,
    `isRegister` BOOLEAN NULL DEFAULT false,
    `contactList` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `globalUser_phoneNo_key`(`phoneNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `globalUser` ADD CONSTRAINT `globalUser_contactList_fkey` FOREIGN KEY (`contactList`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
