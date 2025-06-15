import { notNull } from '@freyja/kit/utils/flow-utils';
import { Flex, FlexProps, Grid, Input, Select, Slider, Switch } from '@mantine/core';
import { reaction, runInAction } from 'mobx';
import { getSnapshot, Model, model, modelAction, prop } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { useMobxRootStoreRegistration } from '../../utils/mobx-util';
import { camelToText } from '../../utils/util';
import { animationCreators, animations } from '../animations';
import { backgrounds } from '../backgrounds';
import { parabgVars } from '../parabg';
import { ParabgSampleView } from './parabg-sample-view';

const directionsOptions = [`normal`, `reverse`, `alternate`, `alternate-reverse`] as const;
const easingOptions = [`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`] as const;
const fillOptions = [`forwards`, `both`] as const;

const saveStorage = (snapshot: object) => {
  localStorage.setItem('anibg-test-store-snapshot', JSON.stringify(snapshot));
};

@model(`focalm/AnibgTestingStore`)
class AnibgTestingStore extends Model({
  hidden: prop(false).withSetter(),
  scale: prop(4).withSetter(),
  selectedAnimation: prop<keyof typeof animationCreators>(`rect0`).withSetter(),
  selectedBackground: prop<keyof typeof backgrounds>(`calm`).withSetter(),
  innerSize0to1: prop(0.2).withSetter(),
  animationDurationSec: prop(5).withSetter(),
  animationFillMode: prop<(typeof fillOptions)[number]>(`both`).withSetter(),
  animationDirection: prop<(typeof directionsOptions)[number]>(`alternate`).withSetter(),
  easing: prop<(typeof easingOptions)[number]>(`ease`).withSetter(),
  // parallaxOpacity: prop(1).withSetter(),
  clip: prop(false).withSetter(),
}) {
  protected override onAttachedToRootStore(): () => void {
    return reaction(() => getSnapshot(this), saveStorage);
  }

  @modelAction
  retrigger() {
    this.setHidden(true);
    setTimeout(() => runInAction(() => this.setHidden(false)), 0);
  }
}

const restoreStorage = () => {
  const s = (() => {
    try {
      return new AnibgTestingStore(JSON.parse(notNull(localStorage.getItem('anibg-test-store-snapshot'))));
    } catch (e) {
      console.log(e);
      return new AnibgTestingStore({});
    }
  })();

  if (!Object.keys(animationCreators).includes(s.selectedAnimation)) {
    s.setSelectedAnimation(`rect0`);
  }
  if (!Object.keys(backgrounds).includes(s.selectedBackground)) {
    s.setSelectedBackground(`calm`);
  }
  return s;
};

export const ParabgTesing = observer<FlexProps>(function ParabgTesing(props) {
  const store = useMemo(() => restoreStorage(), []);
  useMobxRootStoreRegistration(store);

  useEffect(() => store.retrigger(), [store]);

  return (
    <Flex
      {...props}
      style={{
        ...parabgVars({
          duration: store.animationDurationSec,
          fillMode: store.animationFillMode,
          direction: store.animationDirection,
          timing: store.easing,
        }),
        ...props.style,
      }}
      direction="column"
      h="100%"
      gap="md"
      p="sm"
    >
      <Flex direction="column" gap="xs">
        <Grid>
          <Grid.Col span={6}>
            <Input.Wrapper label="Animation Class">
              <Select
                data={Object.keys(animations).map(k => ({ value: k, label: camelToText(k) }))}
                clearable={false}
                value={store.selectedAnimation}
                onChange={value => {
                  if (value) {
                    store.setSelectedAnimation(value as keyof typeof animationCreators);
                    store.retrigger();
                  }
                }}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Bg Class">
              <Select
                data={Object.keys(backgrounds).map(k => ({ value: k, label: camelToText(k) }))}
                clearable={false}
                value={store.selectedBackground}
                onChange={value => {
                  if (value) {
                    store.setSelectedBackground(value as keyof typeof backgrounds);
                    store.retrigger();
                  }
                }}
              />
            </Input.Wrapper>
          </Grid.Col>
          {/*<Grid.Col span={4}>*/}
          {/*  <Input.Wrapper label="Fill Mode">*/}
          {/*    <Select*/}
          {/*      data={fillOptions}*/}
          {/*      clearable={false}*/}
          {/*      value={store.animationFillMode.value}*/}
          {/*      onChange={value => {*/}
          {/*        if (value) {*/}
          {/*          store.animationFillMode.set(value as typeof fillOptions[number]);*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </Input.Wrapper>*/}
          {/*</Grid.Col>*/}
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <Input.Wrapper label="Direction">
              <Select
                data={directionsOptions}
                clearable={false}
                value={store.animationDirection}
                onChange={value => {
                  if (value) {
                    store.setAnimationDirection(value as (typeof directionsOptions)[number]);
                  }
                }}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Easing">
              <Select
                data={easingOptions}
                clearable={false}
                value={store.easing}
                onChange={value => {
                  if (value) {
                    store.setEasing(value as (typeof easingOptions)[number]);
                  }
                }}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={4}>
            <Input.Wrapper label="Inner Size">
              <Slider
                value={store.innerSize0to1}
                onChange={v => store.setInnerSize0to1(v)}
                min={0}
                max={1}
                step={0.01}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Input.Wrapper label="Duration">
              <Slider
                value={store.animationDurationSec}
                onChange={v => store.setAnimationDurationSec(v)}
                min={1}
                max={60}
                step={1}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Input.Wrapper label="Scale">
              <Slider
                value={store.scale}
                onChange={v => {
                  store.setScale(v);
                  store.retrigger();
                }}
                min={2}
                max={10}
                step={1}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={1}>
            <Input.Wrapper label="Clip">
              {/*<Slider*/}
              {/*  value={store.parallaxOpacity}*/}
              {/*  onChange={v => store.setParallaxOpacity(v)}*/}
              {/*  min={0}*/}
              {/*  max={1}*/}
              {/*  step={0.01}*/}
              {/*/>*/}
              <Switch
                // label="Clip"
                checked={store.clip}
                onChange={e => store.setClip(e.currentTarget.checked)}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
      </Flex>
      {store.hidden || (
        <ParabgSampleView
          animationName={store.selectedAnimation}
          backgroundName={store.selectedBackground}
          innerSize0to1={store.innerSize0to1}
          clip={store.clip}
          scale={store.scale}
        />
      )}
    </Flex>
  );
});
