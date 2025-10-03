import { Field, InputType } from '@nestjs/graphql';

import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionScalarRelationFilter {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  is?: UploadSessionWhereInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  isNot?: UploadSessionWhereInput;
}
