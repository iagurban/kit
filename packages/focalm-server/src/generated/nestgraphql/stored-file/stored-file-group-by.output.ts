import { Field, Int, ObjectType } from '@nestjs/graphql';

import { StoredFileAvgAggregate } from './stored-file-avg-aggregate.output';
import { StoredFileCountAggregate } from './stored-file-count-aggregate.output';
import { StoredFileMaxAggregate } from './stored-file-max-aggregate.output';
import { StoredFileMinAggregate } from './stored-file-min-aggregate.output';
import { StoredFileSumAggregate } from './stored-file-sum-aggregate.output';

@ObjectType()
export class StoredFileGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => Int, { nullable: false })
  size!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => StoredFileCountAggregate, { nullable: true })
  _count?: StoredFileCountAggregate;

  @Field(() => StoredFileAvgAggregate, { nullable: true })
  _avg?: StoredFileAvgAggregate;

  @Field(() => StoredFileSumAggregate, { nullable: true })
  _sum?: StoredFileSumAggregate;

  @Field(() => StoredFileMinAggregate, { nullable: true })
  _min?: StoredFileMinAggregate;

  @Field(() => StoredFileMaxAggregate, { nullable: true })
  _max?: StoredFileMaxAggregate;
}
