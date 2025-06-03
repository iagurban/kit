import { Box, Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

export const Errors = observer<{
  errors: readonly unknown[];
}>(function Errors({ errors }) {
  return (
    <Flex direction="column" flex="1 0 auto">
      <Box>Errors:</Box>
      {errors.map((e, i) => (
        <Box key={i}>{`${e}`}</Box>
      ))}
    </Flex>
  );
});
