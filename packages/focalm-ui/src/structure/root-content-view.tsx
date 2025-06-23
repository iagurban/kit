import { isTruthy } from '@freyja/kit/asserts';
import { once } from '@freyja/kit/core/once';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useMemo } from 'react';

import { backgrounds } from '../components/parabg/backgrounds';
import parabgCN from '../components/parabg/parabg.module.scss';
import { getParabgKeyframes } from '../components/parabg/testing-view/parabg-sample-view';
import { LocalePreferencesSource } from '../providers/local-preferences';
import { AnimationConfigProvider, ProvideDatesFormats } from '../utils/react-contexts';
import { ShellHeader } from './shell-header';
import { ShellMainSection } from './shell-main-section';
import { ShellSidePanel } from './shell-side-panel';

const rootParabgScale = 4;

const provideParabgCssVars = (
  name: string,
  bg: string,
  scale: number,
  duration: string,
  other: Pick<CSSProperties, `animationDirection` | `animationTimingFunction` | `animationFillMode`> = {}
) =>
  Object.assign(
    {
      '--parabg-duration': duration,
      '--parabg-animation-name': name,
      '--parabg-background': bg,
      '--parabg-scale': scale,
    },
    Object.fromEntries(
      [
        other.animationDirection && ['--parabg-animation-direction', other.animationDirection],
        other.animationTimingFunction && ['--parabg-timing-function', other.animationTimingFunction],
        other.animationFillMode && ['--parabg-fill-mode', other.animationFillMode],
      ].filter(isTruthy)
    ) as Partial<{
      '--parabg-animation-direction': CSSProperties[`animationDirection`];
      '--parabg-timing-function': CSSProperties['animationTimingFunction'];
      '--parabg-fill-mode': CSSProperties['animationFillMode'];
    }>
  );

export const RootContentView = observer(function RootContentView() {
  const [opened, { toggle }] = useDisclosure();

  const parabgKeyframes = useMemo(() => computed(() => getParabgKeyframes(`rectJumpy`, rootParabgScale)), []);

  return (
    <ProvideDatesFormats value={{ dateFormat: `DD.MM.YYYY`, timeFormat: `HH:mm` }}>
      <LocalePreferencesSource>
        <AnimationConfigProvider
          value={{
            timeMs: 250,
            get transitionAllEaseFull() {
              return once(this, `transitionAllEaseFull`, true, this.transitionAllEase(this.timeMs));
            },
            transitionAllEase(timeMs) {
              return `all ${timeMs}ms ease`;
            },
          }}
        >
          <AppShell
            header={{ height: '3rem' }}
            navbar={{
              width: `8rem`,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            padding="md"
            classNames={{ root: parabgCN.withParabg }}
            styles={{
              navbar: { background: `none` },
              header: { background: `none` },
              root: provideParabgCssVars(
                parabgKeyframes.get().get(),
                backgrounds.calm,
                rootParabgScale,
                `160s`
              ),
            }}
          >
            <AppShell.Header
              p={0}
              m={0}
              styles={{
                header: {
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.5))',
                },
              }}
            >
              <ShellHeader opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar
              styles={{
                navbar: {
                  padding: 0,
                  background: 'linear-gradient(to right, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.5))',
                },
              }}
            >
              <ShellSidePanel />
            </AppShell.Navbar>

            <AppShell.Main style={{ position: `relative`, display: `flex`, flexDirection: `column` }}>
              <ShellMainSection />
            </AppShell.Main>
          </AppShell>
        </AnimationConfigProvider>
      </LocalePreferencesSource>
    </ProvideDatesFormats>
  );
});
