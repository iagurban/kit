import { registerEnumType } from '@nestjs/graphql';

export enum ProjectOrderByRelevanceFieldEnum {
  id = 'id',
  name = 'name',
  abbrev = 'abbrev',
}

registerEnumType(ProjectOrderByRelevanceFieldEnum, {
  name: 'ProjectOrderByRelevanceFieldEnum',
  description: undefined,
});
