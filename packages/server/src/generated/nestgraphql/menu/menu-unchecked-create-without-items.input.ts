import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TagUncheckedCreateNestedManyWithoutMenuInput } from '../tag/tag-unchecked-create-nested-many-without-menu.input';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-menu.input';
import { Type } from 'class-transformer';

@InputType()
export class MenuUncheckedCreateWithoutItemsInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    ownerId!: string;

    @Field(() => TagUncheckedCreateNestedManyWithoutMenuInput, {nullable:true})
    tags?: TagUncheckedCreateNestedManyWithoutMenuInput;

    @Field(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput)
    files?: UploadedFileUncheckedCreateNestedManyWithoutMenuInput;
}
