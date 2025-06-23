import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectCreateManyProjectInput } from './user-in-project-create-many-project.input';

@InputType()
export class UserInProjectCreateManyProjectInputEnvelope {
  @Field(() => [UserInProjectCreateManyProjectInput], { nullable: false })
  @Type(() => UserInProjectCreateManyProjectInput)
  data!: Array<UserInProjectCreateManyProjectInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
