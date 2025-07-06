import { Flex, Grid, Input, Select, Slider } from '@mantine/core';
import { computed, reaction } from 'mobx';
import { getSnapshot, Model, model, prop } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useMemo } from 'react';

import { notNull } from '../../../utils/flow-utils';
import { useMobxRootStoreRegistration } from '../mobx-util';
import { AnimatedSVGGradientBackground } from './animated-svg-gradient-background';

export const restoreStorage = () => {
  try {
    return new AsbgTestingStore(JSON.parse(notNull(localStorage.getItem('AsbgTesting-test-store-snapshot'))));
  } catch (e) {
    console.log(e);
    return new AsbgTestingStore({});
  }
};
const saveStorage = (snapshot: object) => {
  localStorage.setItem('AsbgTesting-test-store-snapshot', JSON.stringify(snapshot));
};

@model(`focalm/AsbgTesting`)
class AsbgTestingStore extends Model({
  scale: prop(() => 1).withSetter(),
  selectedGradientPreset: prop(() => ``).withSetter(),
  selectedRotatePreset: prop(() => ``).withSetter(),
  selectedMovePreset: prop(() => ``).withSetter(),
  rotateDurationSec: prop(() => 60).withSetter(),
  moveDurationSec: prop(() => 60).withSetter(),
}) {
  protected override onAttachedToRootStore(): () => void {
    return reaction(() => getSnapshot(this), saveStorage);
  }
}

export const AnimatedSVGGradientBackgroundTesting = observer<{
  gradientStopsPresets: readonly {
    id: string;
    label?: string;
    stops: readonly {
      offset: number;
      color: string;
    }[];
  }[];
  rotatePresets: readonly {
    id: string;
    label?: string;
    data: { values: string; keyTimes: string };
  }[];
  movePresets: readonly {
    id: string;
    label?: string;
    keyframes: readonly CSSProperties[];
  }[];
}>(function AnimatedSVGGradientBackgroundTesting({ gradientStopsPresets, rotatePresets, movePresets }) {
  const store = useMemo(() => restoreStorage(), []);
  useMobxRootStoreRegistration(store);

  const gradientStops = useMemo(
    () =>
      computed(
        () =>
          gradientStopsPresets.find(f => f.id === store.selectedGradientPreset) ||
          notNull(gradientStopsPresets[0])
      ),
    [gradientStopsPresets, store]
  );

  const rotateKeyframes = useMemo(
    () =>
      computed(
        () => rotatePresets.find(f => f.id === store.selectedRotatePreset) || notNull(rotatePresets[0])
      ),
    [rotatePresets, store]
  );

  const moveAnimation = useMemo(
    () => computed(() => movePresets.find(f => f.id === store.selectedMovePreset) || notNull(movePresets[0])),
    [movePresets, store]
  );

  return (
    <Flex w="100%" h="100%" direction="column" align="stretch" gap="md">
      <Grid>
        <Grid.Col span={4}>
          <Select
            data={gradientStopsPresets.map(g => ({ value: g.id, label: g.label ?? g.id }))}
            label="Gradient"
            value={store.selectedGradientPreset || notNull(gradientStopsPresets[0]).id}
            onChange={v => store.setSelectedGradientPreset(v || ``)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            data={rotatePresets.map(g => ({ value: g.id, label: g.label ?? g.id }))}
            label="Rotate"
            value={store.selectedRotatePreset || notNull(rotatePresets[0]).id}
            onChange={v => store.setSelectedRotatePreset(v || ``)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            data={movePresets.map(g => ({ value: g.id, label: g.label ?? g.id }))}
            label="Move"
            value={store.selectedMovePreset || notNull(movePresets[0]).id}
            onChange={v => store.setSelectedMovePreset(v || ``)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Input.Wrapper label="Scale">
            <Slider min={1} max={10} value={store.scale} onChange={v => store.setScale(v)} />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Input.Wrapper label="Rotate duration">
            <Slider
              label={`${store.rotateDurationSec}s`}
              min={10}
              max={240}
              value={store.rotateDurationSec}
              onChange={v => store.setRotateDurationSec(v)}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Input.Wrapper label="Move duration">
            <Slider
              label={`${store.moveDurationSec}s`}
              min={10}
              max={240}
              value={store.moveDurationSec}
              onChange={v => store.setMoveDurationSec(v)}
            />
          </Input.Wrapper>
        </Grid.Col>
      </Grid>
      <AnimatedSVGGradientBackground
        scale={store.scale}
        gradientStops={gradientStops.get().stops}
        rotateKeyframes={rotateKeyframes.get().data}
        moveAnimation={moveAnimation.get().keyframes}
        rotateDur={`${store.rotateDurationSec}s`}
        moveDur={`${store.moveDurationSec}s`}
      />
    </Flex>
  );
});
