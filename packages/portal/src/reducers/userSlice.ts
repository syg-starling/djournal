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
  contractJGovNFT,
  WEI,
  GAS_LIMIT,
  GAS_PRICE,
  MAX_APPROVAL_VALUE,
} from '../utils/web3'

const jReviewAddr = process.env.NEXT_PUBLIC_JREVIEW_ADDR
const journalAddr = process.env.NEXT_PUBLIC_JOURNAL_ADDR

export enum StatusEnum {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Error = 'ERROR',
}

// declaring the types for our state
export type UserState = {
  processingMetamask: boolean;
  currentUser: any;
  account: string;
  balance: number;
  isMember: boolean;
  tokenId: number;
  modalForm: boolean;
}

const initialState: UserState = {
  processingMetamask: false,
  currentUser: null,
  account: '',
  balance: 0,
  isMember: false,
  tokenId: -1,
  modalForm: false,
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
      console.log('accountChanged accounts.length', accounts.length)
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
    const tokenBalance = await contractToken.methods.balanceOf(account).call()
    const balance = Big(tokenBalance).div(WEI).toFixed(0, 0) // round down
    return Number(balance)
  },
)

export const approveToken = createAsyncThunk(
  'user/approveToken',
  async (_, { getState}) => {
  try {
    const { user } = getState()
    await contractToken.methods.approve(
      jReviewAddr,
      MAX_APPROVAL_VALUE,
    ).send({
      from: user.account,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
    })
    await contractToken.methods.approve(
      journalAddr,
      MAX_APPROVAL_VALUE,
    ).send({
      from: user.account,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
    })
  } catch (err) {
    console.log(err)
  }
})

export const checkMember = createAsyncThunk(
  'user/checkMember',
  async (account: string) => {
    const tokenBalance = await contractJGovNFT.methods.balanceOf(account).call()
    if (tokenBalance !== '0') {
      const tokenId = await contractJGovNFT.methods.tokenOfOwnerByIndex(account, 0).call()
      return tokenId
    }
    return -1
  },
)

export const setAccount = createAsyncThunk(
  'user/setAccount',
  async (account: string, { dispatch }) => {
    await dispatch(checkMember(account))
    await dispatch(getBalance(account))
    return account ? account.toLocaleLowerCase() : ''
  },
)

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (addr) => {
    try {
      const response = await contractJGovNFT.methods.getProfileByAddress(addr).call()
      return {
        name: response.name,
        salutation: response.salutation,
        accredition: response.accredition,
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const setProfile = createAsyncThunk(
  'user/setProfile',
  async ({ id, name, salutation, accredition }: any, { getState }) => {
    try {
      const { user } = getState()
      console.log('id, name, salutation, accredition', id, name, salutation, accredition)
      const response = await contractJGovNFT.methods.setProfile(id, name, salutation, accredition).send({
        from: user.account,
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
      })
      return response
    } catch (e) {
      console.log(e)
    }
  },
)

export const connect = createAsyncThunk(
  'user/connect', 
  async (_, { dispatch }) => {
    web3.currentProvider.on('accountsChanged', async (e) => {
      try {
        console.log('accountsChanged', e)
        const accounts = await web3.eth.requestAccounts()
        dispatch(accountChanged(accounts))
      } catch (e) {
        dispatch(accountChanged([]))
      }
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setModalForm: (state, action: PayloadAction<boolean>) => {
      state.modalForm = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connect.pending, state => {
        state.processingMetamask = true
      })
      .addCase(connect.fulfilled, (state) => {
        state.processingMetamask = false
      })
      .addCase(connect.rejected, state => {
        state.processingMetamask = false
        state.account = ''
        state.isMember = false
        state.balance = 0
      })
      .addCase(setAccount.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.account = payload
      })
      .addCase(getBalance.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.balance = payload
      })
      .addCase(checkMember.fulfilled, (state, { payload }: PayloadAction<any>) => {
        console.log('tokenId', payload)
        state.tokenId = payload
        state.isMember = payload >= 0
      })
      .addCase(accountChanged.rejected, state => {
        console.log('accountChanged.rejected')
        state.account = ''
        state.isMember = false
        state.balance = 0
      })
  }
})

export const {
  setModalForm,
} = userSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default userSlice.reducer
