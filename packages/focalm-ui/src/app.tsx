import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@gfazioli/mantine-parallax/styles.css';

import { uidGenerator } from '@gurban/kit/core/uid-generator';
import { MantineProvider } from '@mantine/core';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { setGlobalConfig } from 'mobx-keystone';
import { FC } from 'react';
import { registerSW } from 'virtual:pwa-register';

import { UrqlProvider } from './providers/urql-provider';
import { theme } from './shared/theme';
import { RootView } from './structure/root-view';

setGlobalConfig({ modelIdGenerator: uidGenerator });
// import minMax from 'dayjs/plugin/minMax' // ES 2015

dayjs.extend(minMax);

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available, reload now?')) {
      void updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline!');
  },
});

export const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <UrqlProvider>
        <RootView />
      </UrqlProvider>
    </MantineProvider>
  );
};
