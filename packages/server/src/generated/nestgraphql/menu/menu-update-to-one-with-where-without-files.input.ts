import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateWithoutFilesInput } from './menu-update-without-files.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpdateToOneWithWhereWithoutFilesInput {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => MenuUpdateWithoutFilesInput, { nullable: false })
  @Type(() => MenuUpdateWithoutFilesInput)
  data!: MenuUpdateWithoutFilesInput;
}
