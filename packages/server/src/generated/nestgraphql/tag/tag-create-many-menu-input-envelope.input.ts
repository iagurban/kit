import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TagCreateManyMenuInput } from './tag-create-many-menu.input';
import { Type } from 'class-transformer';

@InputType()
export class TagCreateManyMenuInputEnvelope {

    @Field(() => [TagCreateManyMenuInput], {nullable:false})
    @Type(() => TagCreateManyMenuInput)
    data!: Array<TagCreateManyMenuInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
