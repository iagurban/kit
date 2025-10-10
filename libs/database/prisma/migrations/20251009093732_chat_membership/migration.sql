-- CreateEnum
CREATE TYPE "public"."ChatRoleTag" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER', 'VIEWER', 'BANNED');

-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "defaultRoleId" UUID;

-- CreateTable
CREATE TABLE "public"."ChatRole" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "tags" "public"."ChatRoleTag"[],
    "permissions" JSONB NOT NULL,

    CONSTRAINT "ChatRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserChatPermissions" (
    "userId" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "roleId" UUID,
    "permissions" JSONB,

    CONSTRAINT "UserChatPermissions_pkey" PRIMARY KEY ("userId","chatId")
);

-- CreateTable
CREATE TABLE "public"."ChatMember" (
    "userId" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("userId","chatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRole_chatId_name_key" ON "public"."ChatRole"("chatId", "name");

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_defaultRoleId_fkey" FOREIGN KEY ("defaultRoleId") REFERENCES "public"."ChatRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatRole" ADD CONSTRAINT "ChatRole_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChatPermissions" ADD CONSTRAINT "UserChatPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChatPermissions" ADD CONSTRAINT "UserChatPermissions_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChatPermissions" ADD CONSTRAINT "UserChatPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."ChatRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatMember" ADD CONSTRAINT "ChatMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatMember" ADD CONSTRAINT "ChatMember_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
