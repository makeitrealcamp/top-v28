import { UserType } from '../../api/users/types';
import { UserState } from './state';

export type ActionType = { type: 'SET_USER'; payload: UserType | null };

const reducer = (state: UserState, action: ActionType): UserState => {
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
