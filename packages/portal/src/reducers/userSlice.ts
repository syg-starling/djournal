/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';

export enum StatusEnum {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Error = 'ERROR',
}

// declaring the types for our state
export type UserState = {
  name: string;
  status: Record<string, StatusEnum>;
  price: number;
  error: Record<string, string>;
};

const initialState: UserState = {
  name: 'Hello world!',
  status: {},
  price: 0,
  error: {}
};

export const getPrice = createAsyncThunk('user/getPrice', async () => {
  const response = await axios.get('https://api.coinstats.app/public/v1/coins/ethereum?currency=USD');
  return response.data?.coin;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPrice.pending, state => {
        state.status = { ...state.status, getPrice: StatusEnum.Loading };
      })
      .addCase(getPrice.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, getPrice: StatusEnum.Idle };
        state.price = payload?.price || 0;
      })
      .addCase(getPrice.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, getPrice: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      });
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setName,
} = userSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectName = (state: RootState) => state.user.name;
export const selectPrice = (state: RootState) => state.user.price;

// exporting the reducer here, as we need to add this to the store
export default userSlice.reducer;