/*
  Warnings:

  - Added the required column `updatedAt` to the `CarDriver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CarDriver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reason" TEXT NOT NULL,
    "startedUsing" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedUsing" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "removedAt" DATETIME,
    "carId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "CarDriver_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CarDriver" ("carId", "driverId", "finishedUsing", "id", "reason", "startedUsing") SELECT "carId", "driverId", "finishedUsing", "id", "reason", "startedUsing" FROM "CarDriver";
DROP TABLE "CarDriver";
ALTER TABLE "new_CarDriver" RENAME TO "CarDriver";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
