import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUncheckedCreateNestedManyWithoutMenuInput } from '../item/item-unchecked-create-nested-many-without-menu.input';
import { TagUncheckedCreateNestedManyWithoutMenuInput } from '../tag/tag-unchecked-create-nested-many-without-menu.input';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-menu.input';

@InputType()
export class MenuUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => ItemUncheckedCreateNestedManyWithoutMenuInput, { nullable: true })
  @Type(() => ItemUncheckedCreateNestedManyWithoutMenuInput)
  items?: ItemUncheckedCreateNestedManyWithoutMenuInput;

  @Field(() => TagUncheckedCreateNestedManyWithoutMenuInput, { nullable: true })
  tags?: TagUncheckedCreateNestedManyWithoutMenuInput;

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput, { nullable: true })
  @Type(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput)
  files?: UploadedFileUncheckedCreateNestedManyWithoutMenuInput;
}
