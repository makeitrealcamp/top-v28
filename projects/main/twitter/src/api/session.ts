const KEY = 'token';

export function setSession(payload: unknown) {
  let data = payload;

  if (typeof payload === 'object') {
    data = JSON.stringify(payload);
  }

  localStorage.setItem(KEY, String(data));
}

export function getSession() {
  let data = localStorage.getItem(KEY);

  if (data && typeof data === 'object') {
    data = JSON.parse(data);
  }

  return data;
}

export function clearSession() {
  localStorage.removeItem(KEY);
  localStorage.setItem('user', String(null));
}
