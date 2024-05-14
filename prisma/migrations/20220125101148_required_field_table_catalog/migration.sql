/*
  Warnings:

  - Made the column `description` on table `catalogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "catalogs" ALTER COLUMN "description" SET NOT NULL;
