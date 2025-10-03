import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StoredFileChecksumSizeBytesCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  checksum!: string;

  @Field(() => String, { nullable: false })
  sizeBytes!: bigint | number;
}
