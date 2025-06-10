import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileCreateManyInput } from './stored-file-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyStoredFileArgs {

    @Field(() => [StoredFileCreateManyInput], {nullable:false})
    @Type(() => StoredFileCreateManyInput)
    data!: Array<StoredFileCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
