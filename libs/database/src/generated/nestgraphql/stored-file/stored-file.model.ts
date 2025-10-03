import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UploadSession } from '../upload-session/upload-session.model';
import { User } from '../user/user.model';

@ObjectType()
export class StoredFile {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  checksum!: string;

  @Field(() => String, { nullable: false })
  sizeBytes!: bigint;

  @Field(() => String, { nullable: false })
  originalFilename!: string;

  @Field(() => String, { nullable: false })
  mimeType!: string;

  @Field(() => String, { nullable: false })
  storageKey!: string;

  @Field(() => String, { nullable: false })
  cdnUrl!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata!: any | null;

  @Field(() => String, { nullable: false })
  uploadedByUserId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => User, { nullable: false })
  uploadedByUser?: User;

  @Field(() => UploadSession, { nullable: true })
  uploadSession?: UploadSession | null;
}
