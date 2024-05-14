/*
  Warnings:

  - Added the required column `country` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_link` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "reference_link" TEXT NOT NULL;
