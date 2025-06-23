import { Flex, NavLink, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStorage } from 'src/storage/storage';

export const ShellSidePanel = observer(function ShellSidePanel() {
  const storage = useStorage();
  return (
    <Flex direction="column">
      <Text fw="bold">Projects</Text>
      {Object.values(storage.projects.cache).map(project => (
        <NavLink
          key={project.id}
          label={project.name}
          active={storage.projects.selectedProjectId === project.id}
        />
      ))}
    </Flex>
  );
});
