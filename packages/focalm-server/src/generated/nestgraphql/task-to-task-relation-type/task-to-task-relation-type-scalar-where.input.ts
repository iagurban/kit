import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TaskToTaskRelationTypeScalarWhereInput {
  @Field(() => [TaskToTaskRelationTypeScalarWhereInput], { nullable: true })
  AND?: Array<TaskToTaskRelationTypeScalarWhereInput>;

  @Field(() => [TaskToTaskRelationTypeScalarWhereInput], { nullable: true })
  OR?: Array<TaskToTaskRelationTypeScalarWhereInput>;

  @Field(() => [TaskToTaskRelationTypeScalarWhereInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationTypeScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  forward?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  inverse?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  projectId?: UuidFilter;
}
