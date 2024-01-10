-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "removedAt" DATETIME
);
INSERT INTO "new_Car" ("brand", "color", "createdAt", "id", "plate", "removedAt", "updatedAt") SELECT "brand", "color", "createdAt", "id", "plate", "removedAt", "updatedAt" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE UNIQUE INDEX "Car_plate_key" ON "Car"("plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
