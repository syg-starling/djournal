/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { JournalReview } from '../models';
import * as srv from '../services/journal-review';

import type { RootState } from '../store';

export enum StatusEnum {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Error = 'ERROR',
}

// declaring the types for our state
export type JournalReviewState = {
  modalForm: boolean;
  status: Record<string, StatusEnum>;
  list: JournalReview[];
  selected: JournalReview | null;
  error: Record<string, string>;
};

const initialState: JournalReviewState = {
  modalForm: false,
  status: {},
  list: [{
    reviewer: { name: 'Angie' },
    remarks: 'Good read',
    id: 'xx1',
    journalId: '456',
    reviewerId: '123',
    rating: 4.5,
  }, {
    reviewer: { name: 'Ken' },
    remarks: 'Well writen piece',
    id: 'xx2',
    journalId: '456',
    reviewerId: '222',
    rating: 5,
  }],
  selected: null,
  error: {}
};

export const fetchJournalReviews = createAsyncThunk(
  'journal-review/getJournalReviews',
  async (query: Partial<JournalReview>) => {
    const response = await srv.getJournalReviews(query)
    return response.data;
  });

export const createJournalReview = createAsyncThunk(
  'journal-review/create',
  async (payload: Partial<JournalReview>) => {
    const response = await srv.createJournalReview(payload)
    return response.data
  });

export const journalReviewSlice = createSlice({
  name: 'journal-review',
  initialState,
  reducers: {
    setModalForm: (state, action: PayloadAction<boolean>) => {
      state.modalForm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJournalReviews.pending, (state: JournalReviewState) => {
        state.status = { ...state.status, fetchJournalReviews: StatusEnum.Loading };
      })
      .addCase(fetchJournalReviews.fulfilled, (state: JournalReviewState, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, fetchJournalReviews: StatusEnum.Idle };
        state.list = payload || [];
      })
      .addCase(fetchJournalReviews.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, fetchJournalReviews: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      })
      .addCase(createJournalReview.pending, (state: JournalReviewState) => {
        state.status = { ...state.status, createJournalReview: StatusEnum.Loading };
      })
      .addCase(createJournalReview.fulfilled, (state: JournalReviewState) => {
        state.status = { ...state.status, createJournalReview: StatusEnum.Idle }
      })
      .addCase(createJournalReview.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = { ...state.status, createJournalReview: StatusEnum.Error };
        state.error = { ...state.error, [payload?.name]: payload?.message };
      });
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setModalForm,
} = journalReviewSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectReviews = (state: RootState) => state.journalReview.list

// exporting the reducer here, as we need to add this to the store
export default journalReviewSlice.reducer;