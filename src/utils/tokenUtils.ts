const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

type TokenKey = typeof ACCESS_KEY | typeof REFRESH_KEY;

const getTokenFromStorage = (tokenKey: TokenKey) => {
  return localStorage.getItem(tokenKey);
};
const setTokenToStorage = (tokenKey: TokenKey, token: string) => {
  return localStorage.setItem(tokenKey, token);
};

export const setAccessToken = (token: string) => setTokenToStorage(ACCESS_KEY, token);
export const setRefreshToken = (token: string) => setTokenToStorage(REFRESH_KEY, token);
export const getAccessToken = () => getTokenFromStorage(ACCESS_KEY);
export const getRefreshToken = () => getTokenFromStorage(REFRESH_KEY);
export const hasTokenInStorage = () => {
  return !!(getTokenFromStorage(ACCESS_KEY) && getTokenFromStorage(REFRESH_KEY));
};
export const clearTokensInStorage = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
