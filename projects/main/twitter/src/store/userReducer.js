const rawState = localStorage.getItem('state');
let user;

if (rawState) {
  const state = JSON.parse(rawState);
  user = state.user;
} else {
  user = null;
}

const initialValues = {
  user,
};

export default function userReducer(state = initialValues, action) {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
}
