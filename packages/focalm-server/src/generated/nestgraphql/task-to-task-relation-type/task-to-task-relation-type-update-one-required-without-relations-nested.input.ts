import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput } from './task-to-task-relation-type-create-or-connect-without-relations.input';
import { TaskToTaskRelationTypeCreateWithoutRelationsInput } from './task-to-task-relation-type-create-without-relations.input';
import { TaskToTaskRelationTypeUpdateToOneWithWhereWithoutRelationsInput } from './task-to-task-relation-type-update-to-one-with-where-without-relations.input';
import { TaskToTaskRelationTypeUpsertWithoutRelationsInput } from './task-to-task-relation-type-upsert-without-relations.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput {
  @Field(() => TaskToTaskRelationTypeCreateWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateWithoutRelationsInput)
  create?: TaskToTaskRelationTypeCreateWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput)
  connectOrCreate?: TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeUpsertWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeUpsertWithoutRelationsInput)
  upsert?: TaskToTaskRelationTypeUpsertWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => TaskToTaskRelationTypeUpdateToOneWithWhereWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeUpdateToOneWithWhereWithoutRelationsInput)
  update?: TaskToTaskRelationTypeUpdateToOneWithWhereWithoutRelationsInput;
}
