-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatCounter" (
    "chatId" UUID NOT NULL,
    "lastNn" BIGINT NOT NULL,

    CONSTRAINT "ChatCounter_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "public"."ChatEvent" (
    "id" BIGSERIAL NOT NULL,
    "nn" BIGINT NOT NULL,
    "chatId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatEvent_authorId_chatId_idx" ON "public"."ChatEvent"("authorId", "chatId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatEvent_chatId_nn_key" ON "public"."ChatEvent"("chatId", "nn");

-- AddForeignKey
ALTER TABLE "public"."ChatCounter" ADD CONSTRAINT "ChatCounter_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatEvent" ADD CONSTRAINT "ChatEvent_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatEvent" ADD CONSTRAINT "ChatEvent_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
