import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MessagesService } from './messages/messages.service';

@Controller()
export class KafkaController {
  constructor(private readonly messagesService: MessagesService) {}

  // Декоратор @MessagePattern подписывает этот метод на указанный топик Kafka
  @MessagePattern('messages_topic')
  async handleNewMessage(@Payload() message: { key: string; value: string }) {
    // `message` - это полное сообщение из Kafka, включая key, value, timestamp и т.д.
    const eventData = JSON.parse(message.value);

    console.log(`Received event from "messages_topic" for chat ${message.key}`);

    // Вызываем метод для выполнения "тяжелой" работы - сохранения в базу
    await this.messagesService.saveMessageToDb(eventData);

    // TODO: Здесь же можно отправить событие в Redis Pub/Sub для оповещения клиентов
    // this.redis.publish(...)
  }
}
