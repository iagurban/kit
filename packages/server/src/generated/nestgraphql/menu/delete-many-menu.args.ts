import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuWhereInput } from './menu-where.input';

@ArgsType()
export class DeleteManyMenuArgs {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
