import { ActionIcon, Flex, Popover, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCancel, IconCheck } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo, useState } from 'react';

import { mantinePopoverShadow } from '../shared/const';

export const WithPopupTextInput = observer<{
  onChange: (s: string) => void;
  renderTarget: (open: () => void) => ReactNode;
}>(function WithPopupTextInput({ onChange, renderTarget }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(``);

  const escape = useMemo(
    () => () => {
      close();
      setValue(``);
    },
    [close]
  );

  const enter = useMemo(
    () => () => {
      escape();
      onChange(value);
    },
    [value, escape]
  );

  return (
    <Popover opened={opened} onDismiss={close} trapFocus shadow={mantinePopoverShadow} withArrow>
      <Popover.Target>{renderTarget(open)}</Popover.Target>
      <Popover.Dropdown>
        <Flex>
          <TextInput
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            onKeyDownCapture={e => {
              switch (e.code) {
                case `Enter`: {
                  enter();
                  e.preventDefault();
                  break;
                }
                case `Escape`: {
                  escape();
                  e.preventDefault();
                  break;
                }
              }
            }}
          />
          <ActionIcon>
            <IconCheck onClick={enter} />
          </ActionIcon>
          <ActionIcon>
            <IconCancel onClick={escape} />
          </ActionIcon>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});
