import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutUploadedFilesInput } from './user-update-without-uploaded-files.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUploadedFilesInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutUploadedFilesInput, { nullable: false })
  @Type(() => UserUpdateWithoutUploadedFilesInput)
  data!: UserUpdateWithoutUploadedFilesInput;
}
