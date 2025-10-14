import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@poslah/util/decorators/current-user';
import { GqlJwtAuthGuard } from '@poslah/util/guards/gql-jwt-auth-guard';

import { PushChatEventArgs } from '../../entities/push-chat-event.args';
import { PushEventResponseDto } from '../../entities/push-event-response.dto';
import { ChatsService } from './chats.service';

@Resolver()
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

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

  @Query(() => Number)
  dummyQuery() {
    return 123456898;
  }
}
