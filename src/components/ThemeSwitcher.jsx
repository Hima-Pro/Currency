import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

const ThemeSwitcher = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const style = {
    position: "absolute",
    right: 10,
    top: 10,
  };

  const icons = {
    auto: "tabler:contrast-filled",
    light: "tabler:sun-filled",
    dark: "tabler:moon-filled",
  };

  return (
    <ActionIcon
      size="xl"
      radius="xl"
      variant="subtle"
      color="#ffffff"
      onClick={toggleColorScheme}
      {...{ style }}
    >
      <Icon width={30} icon={icons[colorScheme]} />
    </ActionIcon>
  );
};

export default ThemeSwitcher;
