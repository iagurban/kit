import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutRelationsSrcInput } from './task-create-or-connect-without-relations-src.input';
import { TaskCreateWithoutRelationsSrcInput } from './task-create-without-relations-src.input';
import { TaskUpdateToOneWithWhereWithoutRelationsSrcInput } from './task-update-to-one-with-where-without-relations-src.input';
import { TaskUpsertWithoutRelationsSrcInput } from './task-upsert-without-relations-src.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneRequiredWithoutRelationsSrcNestedInput {
  @Field(() => TaskCreateWithoutRelationsSrcInput, { nullable: true })
  @Type(() => TaskCreateWithoutRelationsSrcInput)
  create?: TaskCreateWithoutRelationsSrcInput;

  @Field(() => TaskCreateOrConnectWithoutRelationsSrcInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutRelationsSrcInput)
  connectOrCreate?: TaskCreateOrConnectWithoutRelationsSrcInput;

  @Field(() => TaskUpsertWithoutRelationsSrcInput, { nullable: true })
  @Type(() => TaskUpsertWithoutRelationsSrcInput)
  upsert?: TaskUpsertWithoutRelationsSrcInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutRelationsSrcInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutRelationsSrcInput)
  update?: TaskUpdateToOneWithWhereWithoutRelationsSrcInput;
}
