-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "removedAt" DATETIME
);
INSERT INTO "new_Driver" ("createdAt", "id", "name", "removedAt", "updatedAt") SELECT "createdAt", "id", "name", "removedAt", "updatedAt" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE TABLE "new_CarDriver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reason" TEXT NOT NULL,
    "startedUsing" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedUsing" DATETIME,
    "carId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "CarDriver_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CarDriver" ("carId", "driverId", "finishedUsing", "id", "reason", "startedUsing") SELECT "carId", "driverId", "finishedUsing", "id", "reason", "startedUsing" FROM "CarDriver";
DROP TABLE "CarDriver";
ALTER TABLE "new_CarDriver" RENAME TO "CarDriver";
CREATE UNIQUE INDEX "CarDriver_carId_key" ON "CarDriver"("carId");
CREATE UNIQUE INDEX "CarDriver_driverId_key" ON "CarDriver"("driverId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
