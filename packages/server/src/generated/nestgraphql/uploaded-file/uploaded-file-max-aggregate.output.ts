import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    originalName?: string;

    @Field(() => String, {nullable:true})
    mimetype?: string;

    @Field(() => Date, {nullable:true})
    uploadedAt?: Date | string;

    @Field(() => String, {nullable:true})
    uploaderId?: string;

    @Field(() => String, {nullable:true})
    storedFileId?: string;

    @Field(() => String, {nullable:true})
    menuId?: string;
}
