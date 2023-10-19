const reducer = (state, action) => {
  let draft = {
    ...state,
  };
  switch (action.type) {
    case 'SET_USER': {
      draft = {
        ...draft,
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
