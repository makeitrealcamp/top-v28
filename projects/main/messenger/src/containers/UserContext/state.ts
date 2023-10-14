import { UserType } from '../../api/users/types';

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

export type UserState = {
  user: UserType | null;
};

export const initialState: UserState = {
  user,
};
