import { useTheme as useEvergreenTheme } from "evergreen-ui";
import type { theme } from "theme";

const useTheme = () => useEvergreenTheme<typeof theme>();

export { useTheme };
