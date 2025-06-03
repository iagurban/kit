import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagCreateManyMenuInput } from './tag-create-many-menu.input';

@InputType()
export class TagCreateManyMenuInputEnvelope {
  @Field(() => [TagCreateManyMenuInput], { nullable: false })
  @Type(() => TagCreateManyMenuInput)
  data!: Array<TagCreateManyMenuInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
