import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@poslah/util/decorators/current-user';
import { GqlJwtAuthGuard } from '@poslah/util/guards/gql-jwt-auth-guard';

import { ChatsService } from './chats.service';
import { PushChatEventArgs } from './push-chat-event.args';
import { PushEventResponseDto } from './push-event-response.dto';

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
}
