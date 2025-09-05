import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateMessageRequest, Message } from '../../generated.grpc/src/grpc/messages';

@Injectable()
export class MessagesService {
  constructor(@Inject('KAFKA_PRODUCER_SERVICE') private readonly kafkaClient: ClientKafka) {}

  /**
   * Принимает команду на создание сообщения и публикует ее в Kafka.
   */
  async queueMessageForCreation(data: CreateMessageRequest): Promise<Message> {
    const event = {
      ...data,
      // В реальном приложении здесь лучше генерировать временный ID и timestamp
      messageId: 'temp-id-' + Math.random(),
      timestamp: new Date().toISOString(),
    };

    console.log(`Publishing event to "messages_topic" with key ${data.chatId}`);

    // Отправляем событие в топик 'messages_topic'
    // .emit() - это команда "отправить и забыть", она не ждет ответа
    this.kafkaClient.emit('messages_topic', {
      key: data.chatId, // Используем chatId как ключ для правильного распределения по партициям
      value: JSON.stringify(event),
    });

    // Возвращаем "оптимистичный" ответ клиенту, как будто все уже сохранено
    const optimisticResponse: Message = {
      id: event.messageId,
      text: event.text,
      chatId: event.chatId,
      authorId: event.authorId,
      createdAt: {
        seconds: Math.floor(Date.now() / 1000),
        nanos: (Date.now() % 1000) * 1e6,
      },
    };

    return optimisticResponse;
  }

  /**
   * Этот метод будет сохранять сообщение в ScyllaDB.
   * Он будет вызван из Kafka-контроллера.
   */
  async saveMessageToDb(messageData: any): Promise<void> {
    console.log('Saving message to ScyllaDB:', messageData);
    // ... здесь ваша логика для работы с ScyllaDB
  }
}
