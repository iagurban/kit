import { Field, ObjectType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';

@ObjectType()
export class TaskHistoryGroupMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  taskId?: string;

  @Field(() => String, { nullable: true })
  authorId?: string;

  @Field(() => Date, { nullable: true })
  localCreatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;
}
