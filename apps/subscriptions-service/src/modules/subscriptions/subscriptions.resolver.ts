import { JsonValue } from '@gurban/kit/core/json-type';
import { Field, ID, ObjectType, Resolver, Subscription } from '@nestjs/graphql';
import { AppUser } from '@poslah/util/auth-module/auth.types';
import { CurrentUser } from '@poslah/util/auth-module/decorators/current-user';
import GraphQLJSON from 'graphql-type-json';

import { PubsubMessageDto, SubscriptionsService } from './subscriptions.service';

@ObjectType()
class AttachmentInfo {
  @Field(() => ID)
  fileId!: string;

  @Field(() => String)
  mimeType!: string;

  @Field(() => String)
  url!: string;

  @Field(() => String)
  filename!: string;

  @Field(() => BigInt)
  size!: bigint;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, JsonValue> | null;
}

@ObjectType()
class ForwardInfo {
  @Field(() => ID)
  chatId!: string;

  @Field(() => BigInt)
  nn!: bigint;

  @Field(() => String, { nullable: true })
  text?: string | null;

  @Field(() => ID)
  authorId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => [AttachmentInfo], { nullable: true })
  attachments?: AttachmentInfo[];
}

@ObjectType()
class AttachmentPreview {
  @Field(() => String)
  type!: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;
}

@ObjectType()
class ReplyToPreview {
  @Field(() => ID)
  nn!: string;

  @Field(() => ID)
  authorId!: string;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => [AttachmentPreview], { nullable: true })
  attachments?: AttachmentPreview[];
}

@ObjectType()
class Message implements PubsubMessageDto {
  @Field(() => ID)
  chatId!: string;

  @Field(() => BigInt)
  nn!: bigint;

  @Field(() => BigInt, { nullable: true })
  eventNn!: bigint | null;

  @Field(() => ID)
  authorId!: string;

  @Field(() => String, { nullable: true })
  text!: string | null;

  @Field(() => BigInt, { nullable: true })
  replyToNn!: bigint | null;

  @Field(() => [AttachmentInfo], { nullable: true })
  attachments!: AttachmentInfo[];

  @Field(() => [ForwardInfo], { nullable: true })
  forwarded!: ForwardInfo[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  deletedAt!: Date | null;

  @Field(() => Date, { nullable: true })
  editedAt!: Date | null;

  @Field(() => BigInt, { nullable: true })
  editedNn!: bigint | null;

  @Field(() => ReplyToPreview, { nullable: true })
  replyToPreview?: ReplyToPreview;
}

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Subscription(() => Message)
  async messagesSubscription(@CurrentUser() user: AppUser): Promise<AsyncIterator<PubsubMessageDto>> {
    return this.subscriptionsService.subscribeToMessages(user.id, 'messagesSubscription');
  }
}
