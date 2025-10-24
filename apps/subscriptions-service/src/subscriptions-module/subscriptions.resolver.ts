import { Resolver, Subscription } from '@nestjs/graphql';
import { Message } from '@poslah/messages-service/messages-module/message.entity';
import { AppUser } from '@poslah/util/auth-module/auth.types';
import { CurrentUser } from '@poslah/util/auth-module/decorators/current-user';

import { MessagesSubscriptionPayload, SubscriptionsService } from './subscriptions.service';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Subscription(() => Message)
  async messagesSubscription(
    @CurrentUser() user: AppUser
  ): Promise<AsyncIterable<MessagesSubscriptionPayload>> {
    return this.subscriptionsService.subscribeToMessages(user.id, 'messagesSubscription');
  }
}
