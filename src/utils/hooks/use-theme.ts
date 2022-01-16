import { useTheme as useEvergreenTheme } from "evergreen-ui";
import { theme } from "theme";

const useTheme = () => useEvergreenTheme<typeof theme>();

export { useTheme };
