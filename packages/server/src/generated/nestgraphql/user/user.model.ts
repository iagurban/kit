import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Menu } from '../menu/menu.model';
import { RefreshToken } from '../refresh-token/refresh-token.model';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => [Menu], { nullable: true })
  menus?: Array<Menu>;

  @Field(() => [UploadedFile], { nullable: true })
  uploadedFiles?: Array<UploadedFile>;

  @Field(() => [RefreshToken], { nullable: true })
  refreshTokens?: Array<RefreshToken>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
