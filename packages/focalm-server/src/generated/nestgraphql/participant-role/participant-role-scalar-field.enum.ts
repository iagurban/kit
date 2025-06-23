import { registerEnumType } from '@nestjs/graphql';

export enum ParticipantRoleScalarFieldEnum {
  id = 'id',
  name = 'name',
  color = 'color',
}

registerEnumType(ParticipantRoleScalarFieldEnum, {
  name: 'ParticipantRoleScalarFieldEnum',
  description: undefined,
});
