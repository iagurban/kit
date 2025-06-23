import { Box, Text, TextProps } from '@mantine/core';
import { IconCircleOff } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const NoItems = observer<PropsWithChildren<TextProps>>(function NoItems({ children, ...props }) {
  return (
    <Box display="inline-block" style={{ textAlign: `center` }} p="xs">
      <IconCircleOff color="var(--mantine-color-dimmed)" />
      <Text {...props} display="block" c={props.c ?? `dimmed`}>
        {children}
      </Text>
    </Box>
  );
});
