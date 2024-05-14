/*
  Warnings:

  - You are about to drop the `attribute_on_catalogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_catalogs" DROP CONSTRAINT "attribute_on_catalogs_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_catalogs" DROP CONSTRAINT "attribute_on_catalogs_catalog_id_fkey";

-- DropTable
DROP TABLE "attribute_on_catalogs";
