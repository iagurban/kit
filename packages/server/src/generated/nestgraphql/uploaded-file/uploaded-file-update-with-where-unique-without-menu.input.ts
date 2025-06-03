import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileUpdateWithoutMenuInput } from './uploaded-file-update-without-menu.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpdateWithWhereUniqueWithoutMenuInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileUpdateWithoutMenuInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutMenuInput)
  data!: UploadedFileUpdateWithoutMenuInput;
}
