import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profileDetail: [],
  checkOutId : []
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

const checkOutIdSlice = createSlice({
name:"checkOutId",
reducer :{
updateCheckOutId : (state, action) => {
  state.checkOutId = [action.checkOutId];
},
}

}) ;



export const {updateProfile} = ProfileSlice.actions;
export default ProfileSlice.reducer;
export const {updateCheckOutId} = checkOutIdSlice.actions;
 
