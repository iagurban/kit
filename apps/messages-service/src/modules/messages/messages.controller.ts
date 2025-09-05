import { Controller } from '@nestjs/common';
import {
  CreateMessageRequest,
  GetMessagesByChatIdRequest,
  MessagesServiceController,
  MessagesServiceControllerMethods,
} from 'src/generated.grpc/src/grpc/messages';

import { MessagesService } from './messages.service';

@Controller()
@MessagesServiceControllerMethods()
export class MessagesController implements MessagesServiceController {
  constructor(private readonly messagesService: MessagesService) {}

  async createMessage(data: CreateMessageRequest) {
    const createdMessage = await this.messagesService.queueMessageForCreation(data);
    return { message: createdMessage };
  }

  async getMessagesByChatId(data: GetMessagesByChatIdRequest) {
    const foundMessages = await this.messagesService.findMessagesForChat(data);
    return { messages: foundMessages };
  }
}
