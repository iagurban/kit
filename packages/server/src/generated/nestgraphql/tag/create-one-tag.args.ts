import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagCreateInput } from './tag-create.input';

@ArgsType()
export class CreateOneTagArgs {
  @Field(() => TagCreateInput, { nullable: false })
  @Type(() => TagCreateInput)
  data!: TagCreateInput;
}
