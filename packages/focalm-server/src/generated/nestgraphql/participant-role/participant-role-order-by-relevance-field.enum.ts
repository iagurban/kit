import { registerEnumType } from '@nestjs/graphql';

export enum ParticipantRoleOrderByRelevanceFieldEnum {
  id = 'id',
  name = 'name',
  color = 'color',
}

registerEnumType(ParticipantRoleOrderByRelevanceFieldEnum, {
  name: 'ParticipantRoleOrderByRelevanceFieldEnum',
  description: undefined,
});
