import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenScalarWhereInput } from './refresh-token-scalar-where.input';
import { RefreshTokenUpdateManyMutationInput } from './refresh-token-update-many-mutation.input';

@InputType()
export class RefreshTokenUpdateManyWithWhereWithoutUserInput {
  @Field(() => RefreshTokenScalarWhereInput, { nullable: false })
  @Type(() => RefreshTokenScalarWhereInput)
  where!: RefreshTokenScalarWhereInput;

  @Field(() => RefreshTokenUpdateManyMutationInput, { nullable: false })
  @Type(() => RefreshTokenUpdateManyMutationInput)
  data!: RefreshTokenUpdateManyMutationInput;
}
