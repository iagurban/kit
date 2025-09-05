import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class StoredFileCreateWithoutUploadsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => Int, { nullable: false })
  size!: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;
}
