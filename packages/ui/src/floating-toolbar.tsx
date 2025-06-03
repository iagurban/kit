import { Flex, Paper } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const FloatingToolbar = observer<
  PropsWithChildren<{
    visible: boolean;
    position?: `bottom`;
  }>
>(function FloatingToolbar({ children, position, visible }) {
  if (position && position !== `bottom`) {
    throw new Error(`unimplemented`);
  }

  return (
    <Flex
      pos="fixed"
      bottom={0}
      w={`100%`}
      style={{ transform: `translateY(${visible ? 0 : `100%`})`, transition: `transform ease 250ms` }}
      p={16 * 2}
      align={`center`}
      justify={`center`}
    >
      <Paper shadow={`lg`} withBorder p={16}>
        {children}
      </Paper>
    </Flex>
  );
});
