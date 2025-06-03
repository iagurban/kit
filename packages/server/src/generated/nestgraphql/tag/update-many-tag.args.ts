import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagUpdateManyMutationInput } from './tag-update-many-mutation.input';
import { TagWhereInput } from './tag-where.input';

@ArgsType()
export class UpdateManyTagArgs {
  @Field(() => TagUpdateManyMutationInput, { nullable: false })
  @Type(() => TagUpdateManyMutationInput)
  data!: TagUpdateManyMutationInput;

  @Field(() => TagWhereInput, { nullable: true })
  @Type(() => TagWhereInput)
  where?: TagWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
