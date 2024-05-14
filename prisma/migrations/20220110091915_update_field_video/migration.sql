-- AlterTable
ALTER TABLE "brands" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "video" DROP NOT NULL;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "video" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image" DROP NOT NULL;
