import { Box, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';

import { useAuth } from '../auth/useAuth';
import { ParabgTesing } from '../components/parabg/testing-view/parabg-tesing';
import { RootUserStoreProvider } from '../providers/root-user-store-provider';
import { LoginForm } from './login-form';
import { RootContentView } from './root-content-view';

export const RootView = observer(function RootView() {
  const user = useAuth();
  console.log(`user`, user);

  const [anibgOpened, { close: closeAnibg }] = useDisclosure(false);

  return (
    <Box w={`100vw`} style={{ minHeight: `100vh` }} bg={`gray.0`}>
      <Modal
        opened={anibgOpened}
        onClose={closeAnibg}
        fullScreen
        styles={{ content: { display: `flex`, flexDirection: `column` }, body: { flex: `1 0 auto` } }}
      >
        <ParabgTesing />
      </Modal>
      <Modal opened={!user} onClose={() => undefined}>
        <LoginForm />
      </Modal>
      {user && (
        <RootUserStoreProvider>
          <RootContentView />
        </RootUserStoreProvider>
      )}
    </Box>
  );
});
