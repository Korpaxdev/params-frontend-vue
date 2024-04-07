const THEME_KEY = "theme";
export const getThemeFromLocalStorage = () => {
  return localStorage.getItem(THEME_KEY);
};
export const setThemeToLocalStorage = (theme: string) => {
  return localStorage.setItem(THEME_KEY, theme);
};
