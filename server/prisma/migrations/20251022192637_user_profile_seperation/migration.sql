/*
  Warnings:

  - You are about to drop the column `userId` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."achievement" DROP CONSTRAINT "achievement_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project" DROP CONSTRAINT "project_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."skill" DROP CONSTRAINT "skill_userId_fkey";

-- AlterTable
ALTER TABLE "achievement" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar",
DROP COLUMN "description",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
