import { Box } from '@mantine/core';
import { observer } from 'mobx-react-lite';

export const DropLineReference = observer<{
  ml: number;
  color?: string;
  isTop?: boolean;
  visible: boolean;
}>(function DropLineReference({ ml, color, isTop, visible }) {
  return (
    <Box
      pos="absolute"
      bg={color ?? `var(--mantine-color-blue-6)`}
      h="0.2rem"
      ml={ml}
      left={5}
      right={5}
      style={{
        ...(!isTop ? { bottom: -2 } : { top: '50%' }),

        borderRadius: `3px`,
        zIndex: 700,
        opacity: visible ? 1 : 0,
        pointerEvents: `none`,
        transition: `all 100ms ease`,
      }}
    >
      <Box
        pos="absolute"
        left={-2}
        top={`50%`}
        w="0.75rem"
        h="0.75rem"
        style={{
          borderRadius: `50%`,
          border: `2px solid ${color ?? 'var(--mantine-color-blue-6)'}`,
          background: `#fff`,
          transform: `translateY(-50%)`,
        }}
      />
    </Box>
  );
});
