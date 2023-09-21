import { createSlice } from '@reduxjs/toolkit';

const rawState = localStorage.getItem('state');
let user;

if (rawState) {
  const state = JSON.parse(rawState);
  user = state.user.currentUser;
} else {
  user = null;
}

export const initialState = user;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialState,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = (state) => state.user.currentUser;
export default userSlice.reducer;
