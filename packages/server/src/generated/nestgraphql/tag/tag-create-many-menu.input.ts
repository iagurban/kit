import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class TagCreateManyMenuInput {

    @Field(() => String, {nullable:true})
    id?: string;
}
