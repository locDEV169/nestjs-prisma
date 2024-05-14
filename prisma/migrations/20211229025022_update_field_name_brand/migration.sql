/*
  Warnings:

  - You are about to drop the column `brand_name` on the `brands` table. All the data in the column will be lost.
  - Added the required column `name` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "brand_name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
