import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagCreateManyInput } from './tag-create-many.input';

@ArgsType()
export class CreateManyTagArgs {
  @Field(() => [TagCreateManyInput], { nullable: false })
  @Type(() => TagCreateManyInput)
  data!: Array<TagCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
