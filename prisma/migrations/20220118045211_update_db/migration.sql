/*
  Warnings:

  - You are about to drop the column `electrical` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "catalogs" DROP COLUMN "electrical",
DROP COLUMN "region",
ALTER COLUMN "feature" DROP NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "country",
DROP COLUMN "note";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" INTEGER,
ALTER COLUMN "feature" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
