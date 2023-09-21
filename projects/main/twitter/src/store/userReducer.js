const initialValues = {
  user: null,
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
