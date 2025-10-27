import { Injectable } from '@nestjs/common';
import { Prisma } from '@poslah/database/generated/db-client/client';
import { ChatEvent } from '@poslah/database/generated/nestgraphql/chat-event/chat-event.model';
import { DbService } from '@poslah/util/modules/db-module/db.service';
import { InfoEventDto } from '@poslah/util/schemas/info-event-schema';

export type ChatSelectPayload<S extends Prisma.ChatSelect> = Prisma.ChatGetPayload<
  S extends undefined ? undefined : { select: S }
>;

export type ChatEventSelectPayload<S extends Prisma.ChatEventSelect> = Prisma.ChatEventGetPayload<
  S extends undefined ? undefined : { select: S }
>;

export type ChatMemberSelectPayload<S extends Prisma.ChatMemberSelect> = Prisma.ChatMemberGetPayload<
  S extends undefined ? undefined : { select: S }
>;

export type UserChatPermissionsSelectPayload<S extends Prisma.UserChatPermissionsSelect> =
  Prisma.UserChatPermissionsGetPayload<S extends undefined ? undefined : { select: S }>;

@Injectable()
export class ChatsRepository {
  constructor(private readonly db: DbService) {}

  async popNextChatEventMM(chatId: string): Promise<bigint> {
    return (
      await this.db.transaction.chatEventsCounter.update({
        where: { chatId },
        data: { lastNn: { increment: 1 } },
      })
    ).lastNn;
  }

  async applyInfoToDB(payload: InfoEventDto[`payload`], event: ChatEvent): Promise<boolean> {
    const { title, bio, avatar } = payload;
    await this.db.transaction.chat.update({
      where: { id: event.chatId },
      data: {
        // Only update fields that are present in the payload
        ...(title !== undefined && { title }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
      },
    });
    return true;
  }

  async getUserChatPermissions<S extends Prisma.UserChatPermissionsSelect>(
    chatId: string,
    userId: string,
    select?: S
  ): Promise<UserChatPermissionsSelectPayload<S>> {
    return (await this.db.transaction.userChatPermissions.findUnique({
      where: { userId_chatId: { userId, chatId } },
      select,
    })) as UserChatPermissionsSelectPayload<S>;
  }

  async upsertUserChatPermissions<S extends Prisma.UserChatPermissionsSelect>(
    chatId: string,
    userId: string,
    update: Prisma.UserChatPermissionsUpdateInput | Prisma.UserChatPermissionsUncheckedUpdateInput,
    create: Prisma.UserChatPermissionsCreateInput | Prisma.UserChatPermissionsUncheckedCreateInput,
    select?: S
  ): Promise<UserChatPermissionsSelectPayload<S>> {
    return (await this.db.transaction.userChatPermissions.upsert({
      where: { userId_chatId: { userId, chatId } },
      update,
      create,
      select,
    })) as UserChatPermissionsSelectPayload<S>;
  }

  async getUniqueChat<S extends Prisma.ChatSelect>(
    chatId: string,
    select?: S
  ): Promise<ChatSelectPayload<S>> {
    return (await this.db.transaction.chat.findUniqueOrThrow({
      where: { id: chatId },
      select,
    })) as ChatSelectPayload<S>;
  }

  async getUniqueChatMember<S extends Prisma.ChatMemberSelect>(
    chatId: string,
    userId: string,
    select?: S
  ): Promise<ChatMemberSelectPayload<S>> {
    return (await this.db.transaction.chatMember.findUnique({
      where: { userId_chatId: { userId, chatId } },
      select,
    })) as ChatMemberSelectPayload<S>;
  }

  createChatMember(chatId: string, userId: string) {
    return this.db.transaction.chatMember.create({ data: { userId, chatId } });
  }

  async deleteChatMember(chatId: string, userId: string) {
    const { count } = await this.db.transaction.chatMember.deleteMany({
      where: { userId, chatId },
    });
    return count > 0;
  }

  async createChat<S extends Prisma.ChatSelect>(
    data: Omit<Prisma.ChatCreateInput, `counter` | `id` | `events`>,
    select?: S
  ): Promise<ChatSelectPayload<S>> {
    return (await this.db.transaction.chat.create({
      data: { ...data, eventsCounter: {}, messagesCounter: {} },
      select,
    })) as ChatSelectPayload<S>;
  }

  async getUserChats<S extends Prisma.ChatMemberSelect>(
    userId: string,
    select?: S
  ): Promise<ChatMemberSelectPayload<S>[]> {
    return (await this.db.transaction.chatMember.findMany({
      where: { userId },
      select,
    })) as ChatMemberSelectPayload<S>[];
  }

  async getEventsForMessageSinceNm<S extends Prisma.ChatEventSelect>(
    chatId: string,
    messageNn: bigint,
    sinceNn: bigint,
    orderByNn: `asc` | `desc`,
    select?: S
  ): Promise<ChatEventSelectPayload<S>[]> {
    return (await this.db.transaction.chatEvent.findMany({
      where: {
        chatId,
        type: 'message',
        nn: { gt: sinceNn },
        payload: {
          path: ['nn'],
          equals: messageNn.toString(),
        },
      },
      orderBy: { nn: orderByNn },
      select,
    })) as ChatEventSelectPayload<S>[];
  }

  async createChatEvent(data: Prisma.ChatEventCreateInput | Prisma.ChatEventUncheckedCreateInput) {
    return this.db.transaction.chatEvent.create({ data });
  }
}
