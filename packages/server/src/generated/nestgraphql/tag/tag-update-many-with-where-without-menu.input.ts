import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagScalarWhereInput } from './tag-scalar-where.input';
import { TagUpdateManyMutationInput } from './tag-update-many-mutation.input';

@InputType()
export class TagUpdateManyWithWhereWithoutMenuInput {
  @Field(() => TagScalarWhereInput, { nullable: false })
  @Type(() => TagScalarWhereInput)
  where!: TagScalarWhereInput;

  @Field(() => TagUpdateManyMutationInput, { nullable: false })
  @Type(() => TagUpdateManyMutationInput)
  data!: TagUpdateManyMutationInput;
}
