import { Textarea, useMantineTheme } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, CSSProperties, KeyboardEvent, useMemo, useRef, useState } from 'react';

export const editableLabelDecoration = {
  textDecorationStyle: `dashed`,
  textDecorationLine: `underline`,
  textDecorationColor: `#aaa`,
  textDecorationThickness: `1px`,
  cursor: `pointer`,
} as CSSProperties;

export const TitleInput = observer<{
  value: string;
  onChange: (value: string) => void;
}>(function TitleInput({ value, onChange: submit }) {
  const theme = useMantineTheme();

  const [initialValue, setInitialValue] = useState<string | undefined>(undefined);
  const [updatedValue, setUpdatedValue] = useState<string | undefined>(undefined);
  const blurActionRef = useRef<`submit` | `cancel` | undefined>(undefined);

  const { onChange, onFocus, onBlur, onKeyDown } = useMemo(() => {
    return {
      onChange: (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setUpdatedValue(e.target.value.replaceAll(`\n`, ` `));
      },
      onFocus: () => {
        setInitialValue(value);
      },
      onBlur: () => {
        const v =
          blurActionRef.current == null || blurActionRef.current === `submit` ? updatedValue : initialValue;
        blurActionRef.current = undefined;
        if (v && v !== value) {
          submit(v);
        }
        setInitialValue(undefined);
        setUpdatedValue(undefined);
      },
      onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        switch (e.code) {
          case `Enter`: {
            blurActionRef.current = `submit`;

            e.preventDefault();
            e.currentTarget.blur();
            break;
          }
          case `Escape`: {
            blurActionRef.current = `cancel`;

            e.currentTarget.blur();
            break;
          }
        }
      },
    };
  }, [blurActionRef, updatedValue, initialValue, value, submit]);

  return (
    <Textarea
      value={updatedValue === undefined ? (initialValue ?? value) : updatedValue}
      onChange={onChange}
      autosize
      minRows={1}
      autoFocus={false}
      styles={{
        input: {
          '--input-height': '1rem',
          border: `none`,
          outline: `none`,
          ...theme.headings.sizes.h4,
          fontWeight: `bold`,
          ...editableLabelDecoration,
          padding: 0,
        },
      }}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});
