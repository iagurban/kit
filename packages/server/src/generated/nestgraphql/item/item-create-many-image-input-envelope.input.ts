import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateManyImageInput } from './item-create-many-image.input';
import { Type } from 'class-transformer';

@InputType()
export class ItemCreateManyImageInputEnvelope {

    @Field(() => [ItemCreateManyImageInput], {nullable:false})
    @Type(() => ItemCreateManyImageInput)
    data!: Array<ItemCreateManyImageInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
