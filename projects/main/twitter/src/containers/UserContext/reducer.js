const reducer = (state, action) => {
  let draft;
  switch (action.type) {
    case 'SET_USER': {
      draft = {
        ...state,
        user: action.payload,
      };
      break;
    }
    default:
      break;
  }
  localStorage.setItem('state', JSON.stringify(draft));
  return draft;
};

export default reducer;
