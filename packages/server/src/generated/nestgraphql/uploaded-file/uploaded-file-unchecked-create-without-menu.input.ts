import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUncheckedCreateNestedManyWithoutImageInput } from '../item/item-unchecked-create-nested-many-without-image.input';

@InputType()
export class UploadedFileUncheckedCreateWithoutMenuInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  originalName!: string;

  @Field(() => String, { nullable: false })
  mimetype!: string;

  @Field(() => Date, { nullable: true })
  uploadedAt?: Date | string;

  @Field(() => String, { nullable: false })
  uploaderId!: string;

  @Field(() => String, { nullable: false })
  storedFileId!: string;

  @Field(() => ItemUncheckedCreateNestedManyWithoutImageInput, { nullable: true })
  @Type(() => ItemUncheckedCreateNestedManyWithoutImageInput)
  usingItems?: ItemUncheckedCreateNestedManyWithoutImageInput;
}
