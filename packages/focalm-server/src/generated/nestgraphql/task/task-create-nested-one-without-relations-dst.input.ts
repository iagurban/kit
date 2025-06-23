import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutRelationsDstInput } from './task-create-or-connect-without-relations-dst.input';
import { TaskCreateWithoutRelationsDstInput } from './task-create-without-relations-dst.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedOneWithoutRelationsDstInput {
  @Field(() => TaskCreateWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskCreateWithoutRelationsDstInput)
  create?: TaskCreateWithoutRelationsDstInput;

  @Field(() => TaskCreateOrConnectWithoutRelationsDstInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutRelationsDstInput)
  connectOrCreate?: TaskCreateOrConnectWithoutRelationsDstInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;
}
