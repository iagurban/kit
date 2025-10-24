import { once } from '@gurban/kit/core/once';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MessagesGRPCClient } from '@poslah/messages-service/grpc/messages.grpc-client';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import type { RawEventDto } from '@poslah/util/schemas/raw-event-schema';

import { ChatPermissionsService } from './chat-permissions.service';

@Injectable()
export class EventsCheckerService {
  constructor(
    private readonly loggerBase: Logger,
    private readonly permissions: ChatPermissionsService,
    private readonly messagesGrpc: MessagesGRPCClient
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, EventsCheckerService.name);
  }

  /**
   * Checks all necessary permissions for an action using the fully validated event object.
   * This is the single source of truth for authorization before a raw event is published.
   * @param event The validated RawEventDto from the initial parse.
   */
  async authorizeEvent(event: RawEventDto): Promise<void> {
    const isSelfAddEvent =
      event.type === 'membership' &&
      event.payload.action === 'added' &&
      event.payload.userId === event.authorId;

    if (!isSelfAddEvent && !(await this.permissions.isMemberOfChat(event.chatId, event.authorId))) {
      throw new ForbiddenException('You must be a member of this chat to perform this action.');
    }

    // 1. Fetch the user's effective permissions for this chat.
    const permissions = await this.permissions.getPermissions(event.chatId, event.authorId);

    // 2. Check the specific permission required for this action.
    switch (event.type) {
      case 'message': {
        const messagePayload = event.payload;

        if (messagePayload.nn === null) {
          // This is a CREATE operation.
          if (!permissions.sendMessage) {
            throw new ForbiddenException('You do not have permission to send messages in this chat.');
          }
        } else {
          // This is a PATCH (edit or delete) on an existing message.
          // We must fetch the message's metadata from the `messages-service` via gRPC.
          this.logger.info(`Fetching message ${messagePayload.nn} via gRPC for authorization check...`);

          const messageAuthInfo = await this.messagesGrpc.getMessageAuthInfo({
            chatId: event.chatId,
            nn: messagePayload.nn,
          });

          if (!messageAuthInfo) {
            throw new NotFoundException(`Message with nn=${messagePayload.nn} not found for authorization.`);
          }

          // Check for a DELETE operation
          if (messagePayload.deletedAt !== undefined) {
            if (messageAuthInfo.authorId === event.authorId) {
              // User is trying to delete their own message
              if (!permissions.deleteOwnMessages) {
                throw new ForbiddenException('You do not have permission to delete your own messages.');
              }
            } else {
              // User is trying to delete someone else's message
              if (!permissions.deleteAllMessages) {
                throw new ForbiddenException("You do not have permission to delete other users' messages.");
              }
            }
          }

          // TODO: Add similar logic for an EDIT operation (e.g., checking `payload.text`)
          // by checking for an `editOwnMessages` or `editAllMessages` permission.
        }
        break;
      }

      case 'info': {
        if (!permissions.editInfo) {
          throw new ForbiddenException("You do not have permission to edit this chat's information.");
        }
        break;
      }

      case 'membership': {
        const membershipPayload = event.payload;
        switch (membershipPayload.action) {
          case 'added':
            // Differentiate between a user joining and a member inviting.
            if (isSelfAddEvent) {
              // This is a non-member joining. Check the 'join' permissions.
              if (!permissions.joinByButton && !permissions.joinByInvite) {
                throw new ForbiddenException('You do not have permission to join this chat.');
              }
            } else {
              // This is a member inviting someone else. Check the 'invite' permission.
              if (!permissions.invite) {
                throw new ForbiddenException('You do not have permission to invite users to this chat.');
              }
            }
            break;
          case 'removed':
            if (!permissions.kick) {
              throw new ForbiddenException('You do not have permission to remove members from this chat.');
            }
            break;
          case 'updated':
            // Updating a user's permissions requires a higher privilege.
            if (!permissions.kick) {
              throw new ForbiddenException(
                "You do not have permission to update members' roles or permissions."
              );
            }
            break;
        }
        break;
      }

      default:
        throw new BadRequestException('Unknown event type for authorization.');
    }

    this.logger.info(
      `Authorization successful for user ${event.authorId} in chat ${event.chatId} for action [${event.type}]`
    );
  }
}
