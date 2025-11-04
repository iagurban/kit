import { ActionIcon } from '@mantine/core';
import { IconCaretDown, IconCaretRight } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { MouseEvent } from 'react';

export const ExpandButtonReference = observer<{
  visible: boolean;
  opened: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}>(function ExpandButtonReference({ visible, opened, onClick }) {
  return (
    <ActionIcon
      onClick={onClick}
      size={`sm`}
      variant={`subtle`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? undefined : `none`,
      }}
    >
      {opened ? <IconCaretDown /> : <IconCaretRight />}
    </ActionIcon>
  );
});
