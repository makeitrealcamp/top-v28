let user = null;
const json = localStorage.getItem('state');
if (json) {
  try {
    const data = JSON.parse(json);
    user = data.user;
  } catch (error) {
    console.error(error);
  }
}

export const initialState = {
  user,
};
