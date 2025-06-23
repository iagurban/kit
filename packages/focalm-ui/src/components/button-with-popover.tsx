import { Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { mantinePopoverShadow } from '../shared/const';

export const ButtonWithPopover = observer<{
  renderTarget: (open: () => void, close: () => void) => ReactNode;
  renderDropdown: (close: () => void) => ReactNode;
}>(function ButtonWithPopover({ renderTarget, renderDropdown }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Popover withArrow opened={opened} onDismiss={close} shadow={mantinePopoverShadow}>
      <Popover.Dropdown>{renderDropdown(close)}</Popover.Dropdown>
      <Popover.Target>{renderTarget(open, close)}</Popover.Target>
    </Popover>
  );
});
