import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateManyMutationInput } from './menu-update-many-mutation.input';
import { MenuWhereInput } from './menu-where.input';

@ArgsType()
export class UpdateManyMenuArgs {
  @Field(() => MenuUpdateManyMutationInput, { nullable: false })
  @Type(() => MenuUpdateManyMutationInput)
  data!: MenuUpdateManyMutationInput;

  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
