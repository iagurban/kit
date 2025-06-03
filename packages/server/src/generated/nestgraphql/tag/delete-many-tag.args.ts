import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagWhereInput } from './tag-where.input';

@ArgsType()
export class DeleteManyTagArgs {
  @Field(() => TagWhereInput, { nullable: true })
  @Type(() => TagWhereInput)
  where?: TagWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
