/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'
import Big from 'big.js'

import type { RootState } from '../store'
import { 
  web3, 
  contractToken,
  WEI,
} from '../utils/web3'

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
  processingMetamask: boolean;
  account: string;
  balance: number;
}

const initialState: UserState = {
  name: 'Hello world!',
  status: {},
  price: 0,
  error: {},
  processingMetamask: false,
  account: '',
  balance: 0,
}

export const persistConfig: Reducer.PersistConfig<UserState> = {
  key: 'user',
  version: 1,
  whitelist: [
    'account',
  ],
}

export const getPrice = createAsyncThunk('user/getPrice', async () => {
  const response = await axios.get('https://api.coinstats.app/public/v1/coins/ethereum?currency=USD');
  return response.data?.coin;
})

export const accountChanged = createAsyncThunk(
  'user/accountChanged',
  async (accounts: string[], { getState, rejectWithValue, dispatch }) => {
    const { user } = getState()
    console.log('accountChanged user', user)
    if (accounts.length === 0) {
      return rejectWithValue('logout')
    } else {
      if (user.account && accounts[0].toLowerCase() !== user.account) {
        return rejectWithValue('logout')
      }
      window.localStorage.setItem('connectorId', 'injected')
      return dispatch(setAccount(accounts[0]))
    }
  },
)

export const getBalance = createAsyncThunk(
  'user/getBalance',
  async (account: string) => {
    const tokenBalance = contractToken.methods.balanceOf(account).call()
    const balance = Big(tokenBalance).div(WEI).toFixed(0, 0) // round down
    return Number(balance)
  },
)

export const setAccount = createAsyncThunk(
  'user/setAccount',
  async (account: string, { dispatch }) => {
    dispatch(getBalance(account))
    return account ? account.toLocaleLowerCase() : ''
  },
)

export const connect = createAsyncThunk(
  'user/connect', 
  async (_, { dispatch }) => {
    web3.currentProvider.on('accountsChanged', async (e) => {
      console.log('accountsChanged', e)
      const accounts = await web3.eth.requestAccounts()
      dispatch(accountChanged(accounts))
    })

    web3.currentProvider.on('disconnect', (e) => {
      console.log('disconnect', e)
      dispatch(accountChanged([]))
    })

    const accounts = await web3.eth.requestAccounts()
    console.log('connect', accounts)
    dispatch(accountChanged(accounts))
  }
)

export const login = createAsyncThunk('user/login', async () => {
  const response = await axios.get('https://api.coinstats.app/public/v1/coins/ethereum?currency=USD');
  return response.data?.coin;
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPrice.pending, state => {
        state.status = { ...state.status, getPrice: StatusEnum.Loading }
      })
      .addCase(getPrice.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, getPrice: StatusEnum.Idle }
        state.price = payload?.price || 0
      })
      .addCase(getPrice.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, getPrice: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(connect.pending, state => {
        state.processingMetamask = true
      })
      .addCase(connect.fulfilled, (state) => {
        state.processingMetamask = false
      })
      .addCase(connect.rejected, state => {
        state.processingMetamask = false
        state.account = ''
        state.balance = 0
      })
      .addCase(setAccount.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.account = payload
      })
      .addCase(getBalance.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.balance = payload
      })
      .addCase(accountChanged.rejected, state => {
        state.account = ''
        state.balance = 0
      })
  }
})

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setName,
} = userSlice.actions

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectName = (state: RootState) => state.user.name
export const selectPrice = (state: RootState) => state.user.price

// exporting the reducer here, as we need to add this to the store
export default userSlice.reducer
