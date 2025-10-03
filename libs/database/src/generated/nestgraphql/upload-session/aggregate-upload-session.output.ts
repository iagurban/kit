import { Field, ObjectType } from '@nestjs/graphql';

import { UploadSessionAvgAggregate } from './upload-session-avg-aggregate.output';
import { UploadSessionCountAggregate } from './upload-session-count-aggregate.output';
import { UploadSessionMaxAggregate } from './upload-session-max-aggregate.output';
import { UploadSessionMinAggregate } from './upload-session-min-aggregate.output';
import { UploadSessionSumAggregate } from './upload-session-sum-aggregate.output';

@ObjectType()
export class AggregateUploadSession {
  @Field(() => UploadSessionCountAggregate, { nullable: true })
  _count?: UploadSessionCountAggregate;

  @Field(() => UploadSessionAvgAggregate, { nullable: true })
  _avg?: UploadSessionAvgAggregate;

  @Field(() => UploadSessionSumAggregate, { nullable: true })
  _sum?: UploadSessionSumAggregate;

  @Field(() => UploadSessionMinAggregate, { nullable: true })
  _min?: UploadSessionMinAggregate;

  @Field(() => UploadSessionMaxAggregate, { nullable: true })
  _max?: UploadSessionMaxAggregate;
}
