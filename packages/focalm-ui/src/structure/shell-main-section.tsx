import { observer } from 'mobx-react-lite';

import { CardsStack } from '../editing/cards-stack';
import { TasksListView } from '../tasks-list/tasks-list-view';

export const ShellMainSection = observer(function ShellMainSection() {
  return (
    <>
      <TasksListView />
      <CardsStack />
    </>
  );
});
