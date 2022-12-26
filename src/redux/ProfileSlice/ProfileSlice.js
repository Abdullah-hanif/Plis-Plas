import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profileDetail: [],
};

const ProfileSlice = createSlice({
  name: 'profileDetail',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profileDetail = [action.payload];
    },
  },
});

export const {updateProfile} = ProfileSlice.actions;
export default ProfileSlice.reducer;
