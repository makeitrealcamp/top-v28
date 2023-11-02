import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'token';

export async function setSession(payload) {
  let data = payload;

  if (typeof payload === 'object') {
    data = JSON.stringify(payload);
  }

  await AsyncStorage.setItem(KEY, String(data));
}

export async function getSession() {
  let data = await AsyncStorage.getItem(KEY);

  if (data && typeof data === 'object') {
    data = JSON.parse(data);
  }

  return data;
}

export async function clearSession() {
  await AsyncStorage.removeItem(KEY);
  await AsyncStorage.setItem('user', String(null));
}
