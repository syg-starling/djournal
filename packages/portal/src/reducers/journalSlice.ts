/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const Big = require('big.js')
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import * as srv from '../services/journal';

import { Journal } from '../../../service/src/app/journal/journal.interface'
import { RootState } from '../store';
import { contractJReview, GAS_LIMIT, GAS_PRICE, WEI } from '../utils/web3'

export enum StatusEnum {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Error = 'ERROR',
}

// declaring the types for our state
export type JournalState = {
  modalForm: boolean;
  status: Record<string, StatusEnum>;
  list: Journal[];
  selected: Journal | null;
  error: Record<string, string>;
};

const initialState: JournalState = {
  modalForm: false,
  status: {},
  list: [],
  selected: null,
  error: {}
};

export const fetchJournals = createAsyncThunk(
  'journal/getJournals',
  async (params) => {
    const response = await srv.getJournals(params)
    return response.data;
  }
);

export const fetchJournal = createAsyncThunk(
  'journal/getJournal',
  async (id: string) => {
    const response = await srv.getJournal({ id })
    return response.data;
  }
);

export const createJournal = createAsyncThunk(
  'journal/createJournals',
  async (params) => {
    const response = await srv.postJournal(params)
    return response.data;
  }
);

export const startReview = createAsyncThunk(
  'journal/startReview',
  async (payload, { getState }) => {
    const { user } = getState()
    console.log({ payload })
    try {
      const bounty = new Big(payload.bounty).times(WEI).toFixed(0)
      let response = await contractJReview.methods.submitApplication(payload.id, bounty).send({
        from: user.account,
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
      })
      console.log({ response })
      if (response.ok)
        response = await srv.updateJournal({
          id: payload.id,
          reviewStatus: 'STARTED',
          reviewClosedAt: payload.reviewClosedAt,
          bounty: payload.bounty,
        })
      return response.data
    } catch (err) {
      console.log({ err })
    }


  }
)

export const startApproval = createAsyncThunk(
  'journal/startApproval',
  async (id: string) => {
    const response = await srv.updateJournal({
      id,
      approvalStatus: 'STARTED',
    })
    return response.data
  }
)

export const updateJournal = createAsyncThunk(
  'journal/updateJournal',
  async (payload) => {
    const response = await srv.updateJournal(payload)
    return response.data
  }
)

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setModalForm: (state, action: PayloadAction<boolean>) => {
      state.modalForm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJournals.pending, state => {
        state.status = { ...state.status, fetchJournals: StatusEnum.Loading };
      })
      .addCase(fetchJournals.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, fetchJournals: StatusEnum.Idle };
        state.list = payload || [];
      })
      .addCase(fetchJournals.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, fetchJournals: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(fetchJournal.pending, state => {
        state.status = { ...state.status, fetchJournal: StatusEnum.Loading };
        state.selected = null
      })
      .addCase(fetchJournal.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, fetchJournal: StatusEnum.Idle };
        state.selected = payload;
      })
      .addCase(fetchJournal.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, fetchJournal: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(createJournal.pending, state => {
        state.status = { ...state.status, createJournal: StatusEnum.Loading };
      })
      .addCase(createJournal.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, createJournal: StatusEnum.Idle };
      })
      .addCase(createJournal.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, createJournal: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(startReview.pending, state => {
        state.status = { ...state.status, startReview: StatusEnum.Loading };
      })
      .addCase(startReview.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, startReview: StatusEnum.Idle };
      })
      .addCase(startReview.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, startReview: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(startApproval.pending, state => {
        state.status = { ...state.status, startApproval: StatusEnum.Loading };
      })
      .addCase(startApproval.fulfilled, (state, { payload }) => {
        state.status = { ...state.status, startApproval: StatusEnum.Idle };
      })
      .addCase(startApproval.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, startApproval: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      });
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setModalForm,
} = journalSlice.actions;

export const selectJournal = (state: RootState) => state.journal?.selected
export const selectStatus = (state: RootState) => state.journal.status


// exporting the reducer here, as we need to add this to the store
export default journalSlice.reducer
