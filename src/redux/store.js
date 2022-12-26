import {configureStore} from '@reduxjs/toolkit';

import ProfileReducer from './ProfileSlice/ProfileSlice';

export const store = configureStore({
  reducer: {
    profileDetail: ProfileReducer,
  },
});
