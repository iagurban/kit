import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutRelationsDstInput } from './task-create-or-connect-without-relations-dst.input';
import { TaskCreateWithoutRelationsDstInput } from './task-create-without-relations-dst.input';
import { TaskUpdateToOneWithWhereWithoutRelationsDstInput } from './task-update-to-one-with-where-without-relations-dst.input';
import { TaskUpsertWithoutRelationsDstInput } from './task-upsert-without-relations-dst.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneRequiredWithoutRelationsDstNestedInput {
  @Field(() => TaskCreateWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskCreateWithoutRelationsDstInput)
  create?: TaskCreateWithoutRelationsDstInput;

  @Field(() => TaskCreateOrConnectWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutRelationsDstInput)
  connectOrCreate?: TaskCreateOrConnectWithoutRelationsDstInput;

  @Field(() => TaskUpsertWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskUpsertWithoutRelationsDstInput)
  upsert?: TaskUpsertWithoutRelationsDstInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutRelationsDstInput)
  update?: TaskUpdateToOneWithWhereWithoutRelationsDstInput;
}
