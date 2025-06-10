import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileCreateInput } from './stored-file-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneStoredFileArgs {

    @Field(() => StoredFileCreateInput, {nullable:false})
    @Type(() => StoredFileCreateInput)
    data!: StoredFileCreateInput;
}
