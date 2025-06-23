import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TaskToTaskRelationScalarWhereInput {
  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  AND?: Array<TaskToTaskRelationScalarWhereInput>;

  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  OR?: Array<TaskToTaskRelationScalarWhereInput>;

  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  srcId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  dstId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  typeId?: UuidFilter;
}
