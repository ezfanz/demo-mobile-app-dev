import * as SecureStore from 'expo-secure-store';

export const saveSession = async (key, value) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getSession = async (key) => {
  const result = await SecureStore.getItemAsync(key);
  return result ? JSON.parse(result) : null;
};

export const clearSession = async (key) => {
  await SecureStore.deleteItemAsync(key);
};