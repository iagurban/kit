import { Field, ID, ObjectType } from '@nestjs/graphql';

import { StoredFile } from '../stored-file/stored-file.model';
import { User } from '../user/user.model';

@ObjectType()
export class UploadedFile {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  originalName!: string;

  @Field(() => String, { nullable: false })
  mimetype!: string;

  @Field(() => Date, { nullable: false })
  uploadedAt!: Date;

  @Field(() => String, { nullable: false })
  uploaderId!: string;

  @Field(() => String, { nullable: false })
  storedFileId!: string;

  @Field(() => User, { nullable: false })
  uploader?: User;

  @Field(() => StoredFile, { nullable: false })
  storedFile?: StoredFile;
}
