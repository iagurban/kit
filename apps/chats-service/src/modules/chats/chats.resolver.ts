import { PrismaSelection } from '@gurban/kit/nest/decorators/prisma-selection.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DbService } from '@poslah/database/db/db.service';
import { Prisma } from '@poslah/database/generated/db-client/client';
import { Chat } from '@poslah/database/generated/nestgraphql/chat/chat.model';
import { AppUser } from '@poslah/util/auth-module/auth.types';
import { CurrentUser } from '@poslah/util/decorators/current-user';
import { GqlJwtAuthGuard } from '@poslah/util/guards/gql-jwt-auth-guard';

import { PushChatEventArgs } from '../../entities/push-chat-event.args';
import { PushEventResponseDto } from '../../entities/push-event-response.dto';
import { ChatsService } from './chats.service';

@Resolver()
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly db: DbService
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Chat])
  async joinedChats(
    @CurrentUser() user: AppUser,
    @PrismaSelection({ check: (_, f) => f.name.value !== `__typename` })
    selection: Prisma.ChatSelect
  ): Promise<Chat[]> {
    return this.chatsService.getJoinedChats(user.id, selection);
  }

  /**
   * Handles incoming commands from clients to create a new event.
   * Returns an optimistic response immediately.
   */
  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => PushEventResponseDto, { name: 'pushChatEvent' })
  async pushChatEvent(
    @CurrentUser() user: CurrentUser,
    @Args() args: PushChatEventArgs
  ): Promise<PushEventResponseDto> {
    return this.chatsService.pushEventOptimistic(user.id, args);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Number)
  async dummyQuery(@CurrentUser() user: AppUser) {
    console.log(user);
    const chat =
      (await this.db.transaction.chat.findFirst({ select: { id: true } })) ||
      (await this.db.transaction.chat.create({
        data: { messagesCounter: {}, eventsCounter: {}, title: 'Chat #1', ownerId: user.id },
      }));

    await this.db.transaction.chatMember.upsert({
      where: { userId_chatId: { userId: user.id, chatId: chat.id } },
      create: { chatId: chat.id, userId: user.id },
      update: {},
    });

    return user.id.length;
  }
}
