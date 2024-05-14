/*
  Warnings:

  - A unique constraint covering the columns `[catalog]` on the table `catalogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "catalogs_catalog_key" ON "catalogs"("catalog");
