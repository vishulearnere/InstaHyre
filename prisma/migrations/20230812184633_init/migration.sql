/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `globalUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `globalUser_phoneNo_key` ON `globaluser`;

-- CreateIndex
CREATE UNIQUE INDEX `globalUser_name_key` ON `globalUser`(`name`);
