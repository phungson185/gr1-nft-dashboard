import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reducers';

export type ProfileState = {
  id?: number;
  address?: string;
  isLoggedIn?: boolean;
  accessToken?: string;
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoggedIn: false,
  } as ProfileState,
  reducers: {
    signIn: (state, { payload }) => {
      const profile = { ...state, ...payload, isLoggedIn: true };
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
    signOut: () => {
      localStorage.removeItem('profile');
      return { isLoggedIn: false };
    },
  },
});

export const { signIn, signOut } = profileSlice.actions;

export const profileSelector = ({ profile }: RootState) => profile;

export default profileSlice.reducer;
