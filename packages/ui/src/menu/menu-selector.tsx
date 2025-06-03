import { Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useEditingTreeContext } from './stores/menu-editing-store';

export const MenuSelector = observer(function MenuSelector() {
  const editCtx = useEditingTreeContext();
  return (
    editCtx.menu.menuRequest.result?.data && (
      <Select
        data={editCtx.menu.menuRequest.result.data.availableMenus.map(m => ({
          value: m.id,
          label: m.title,
        }))}
        value={editCtx.selectedMenuID ?? editCtx.menu.menuRequest.result.data.menu?.id}
        onChange={id => id && editCtx.setSelectedMenuID(id)}
      />
    )
  );
});
