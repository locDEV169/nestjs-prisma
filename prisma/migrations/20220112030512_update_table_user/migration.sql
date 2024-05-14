/*
  Warnings:

  - You are about to drop the column `type_id` on the `attributes` table. All the data in the column will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attributes" DROP CONSTRAINT "attributes_type_id_fkey";

-- AlterTable
ALTER TABLE "attributes" DROP COLUMN "type_id",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "types";

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
