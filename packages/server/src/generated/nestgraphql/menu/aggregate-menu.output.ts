import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { MenuCountAggregate } from './menu-count-aggregate.output';
import { MenuMinAggregate } from './menu-min-aggregate.output';
import { MenuMaxAggregate } from './menu-max-aggregate.output';

@ObjectType()
export class AggregateMenu {

    @Field(() => MenuCountAggregate, {nullable:true})
    _count?: MenuCountAggregate;

    @Field(() => MenuMinAggregate, {nullable:true})
    _min?: MenuMinAggregate;

    @Field(() => MenuMaxAggregate, {nullable:true})
    _max?: MenuMaxAggregate;
}
