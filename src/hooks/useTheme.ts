import { onBeforeMount } from 'vue';

import { getThemeFromLocalStorage, setThemeToLocalStorage } from '../utils/themeUtils.ts';

const BS_ATTR = 'data-bs-theme';

const useTheme = () => {
  onBeforeMount(() => {
    if (!window.matchMedia) return;
    let theme = getThemeFromLocalStorage();
    if (theme) {
      return document.documentElement.setAttribute(BS_ATTR, theme);
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    setThemeToLocalStorage(theme);
    return document.documentElement.setAttribute(BS_ATTR, theme);
  });
};

export default useTheme;
