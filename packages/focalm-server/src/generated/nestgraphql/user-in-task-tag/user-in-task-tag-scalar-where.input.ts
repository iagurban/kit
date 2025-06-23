import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class UserInTaskTagScalarWhereInput {
  @Field(() => [UserInTaskTagScalarWhereInput], { nullable: true })
  AND?: Array<UserInTaskTagScalarWhereInput>;

  @Field(() => [UserInTaskTagScalarWhereInput], { nullable: true })
  OR?: Array<UserInTaskTagScalarWhereInput>;

  @Field(() => [UserInTaskTagScalarWhereInput], { nullable: true })
  NOT?: Array<UserInTaskTagScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userInTaskId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  roleId?: UuidFilter;
}
