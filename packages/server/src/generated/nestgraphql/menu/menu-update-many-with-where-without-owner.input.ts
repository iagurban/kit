import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuScalarWhereInput } from './menu-scalar-where.input';
import { MenuUpdateManyMutationInput } from './menu-update-many-mutation.input';

@InputType()
export class MenuUpdateManyWithWhereWithoutOwnerInput {
  @Field(() => MenuScalarWhereInput, { nullable: false })
  @Type(() => MenuScalarWhereInput)
  where!: MenuScalarWhereInput;

  @Field(() => MenuUpdateManyMutationInput, { nullable: false })
  @Type(() => MenuUpdateManyMutationInput)
  data!: MenuUpdateManyMutationInput;
}
