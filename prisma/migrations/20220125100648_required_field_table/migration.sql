/*
  Warnings:

  - Made the column `image` on table `catalogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "catalogs" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image" SET NOT NULL;
