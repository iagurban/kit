import { samples } from '@freyja/kit/utils/array-utils';
import { Flex, Input, Popover, Slider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { hsl } from 'chroma.ts';
import { observer } from 'mobx-react-lite';

import { TaskCardStore } from '../storage';
import { distance00to11, distanceTo00 } from '../utils/geometry';
import { useAnimationConfig } from '../utils/react-contexts';
import classNames from './editing.module.scss';
import { gainHue, gainHueFor0, gainHueFor1, gainPointColor, Ratio2DGraph } from './ratio2-d-graph';

const lightColor = (hue: number) => hsl(hue, 0.8, 0.8).hex();

const step = (gainHueFor1 - gainHueFor0) / 3;
const hues = [
  gainHueFor0,
  ...samples(3).reduce(o => {
    return [...o, (o.at(-1) || gainHueFor0) + step];
  }, [] as number[]),
].map(lightColor);

const overGoodColor = lightColor(gainHue(distance00to11));

export const pointSizeRem = 1;

const GainLine = observer<{ value: number }>(function GainLine({ value }) {
  const { timeMs } = useAnimationConfig();
  return (
    <Flex className={classNames.gainLineRoot}>
      <Flex className={classNames.gainBgLines}>
        <Flex w={`${(1 / distance00to11) * 100}%`}>
          {hues.map((hue, index) => (
            <Flex className={classNames.gainBgLine} key={index} flex="1 0 0" bg={hue} />
          ))}
        </Flex>
        <Flex className={classNames.gainBgLine} flex="1 0 0" bg={overGoodColor} />
      </Flex>
      <Flex
        className={classNames.gainLinePoint}
        left={`${(value / distance00to11) * 100}%`}
        bg={gainPointColor(value)}
        style={{ transition: `all ${timeMs}ms ease` }}
      />
    </Flex>
  );
});

export const PrioritizingInput = observer<{
  cardStore: TaskCardStore;
}>(function PrioritizingInput({ cardStore }) {
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const impact = cardStore.actual.impact ?? 0.5;
  const ease = cardStore.actual.ease ?? 0.5;
  const gain = distanceTo00(impact, ease);

  return (
    <Popover opened={opened} onDismiss={close}>
      <Popover.Target>
        <Ratio2DGraph xLabel="impact" x={impact} yLabel="ease" y={ease} gain={gain} onClick={open} />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" w="20rem" gap="sm">
          <Input.Wrapper label="Ease">
            <Slider
              label={`${Math.round((cardStore.actual.ease ?? 0.5) * 100)}%`}
              value={(cardStore.actual.ease ?? 0.5) * 100}
              max={100}
              min={0}
              onChange={v => cardStore.setNumberValue(`ease`, v / 100)}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Impact">
            <Slider
              label={`${Math.round((cardStore.actual.impact ?? 0.5) * 100)}%`}
              value={(cardStore.actual.impact ?? 0.5) * 100}
              max={100}
              min={0}
              onChange={v => cardStore.setNumberValue(`impact`, v / 100)}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Gain">
            <GainLine value={gain} />
          </Input.Wrapper>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});
