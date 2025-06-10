import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class UserInTaskScalarWhereInput {
  @Field(() => [UserInTaskScalarWhereInput], { nullable: true })
  AND?: Array<UserInTaskScalarWhereInput>;

  @Field(() => [UserInTaskScalarWhereInput], { nullable: true })
  OR?: Array<UserInTaskScalarWhereInput>;

  @Field(() => [UserInTaskScalarWhereInput], { nullable: true })
  NOT?: Array<UserInTaskScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  taskId?: UuidFilter;
}
