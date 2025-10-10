import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PushEventResponseDto {
  /**
   * The sequence number assigned to the event within the chat.
   * Transmitted as a string to safely handle large numbers (BigInt).
   */
  @Field(() => String, { description: 'Присвоенный порядковый номер события в чате' })
  nn!: string;

  /**
   * The server timestamp when the event was accepted.
   */
  @Field(() => Date, { description: 'Серверное время генерации события' })
  createdAt!: Date;
}
