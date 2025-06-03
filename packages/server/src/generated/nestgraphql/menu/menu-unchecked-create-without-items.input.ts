import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TagUncheckedCreateNestedManyWithoutMenuInput } from '../tag/tag-unchecked-create-nested-many-without-menu.input';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-menu.input';

@InputType()
export class MenuUncheckedCreateWithoutItemsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => TagUncheckedCreateNestedManyWithoutMenuInput, { nullable: true })
  tags?: TagUncheckedCreateNestedManyWithoutMenuInput;

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput, { nullable: true })
  @Type(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput)
  files?: UploadedFileUncheckedCreateNestedManyWithoutMenuInput;
}
