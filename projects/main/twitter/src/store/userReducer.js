const rawState = localStorage.getItem('state');
let user;

if (rawState) {
  const state = JSON.parse(rawState);
  user = state.user;
} else {
  user = null;
}

export const initialValues = user;

export default function userReducer(state = initialValues, action) {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload;
    }
    default:
      return state;
  }
}
