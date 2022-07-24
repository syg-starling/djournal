/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import { getJournals } from '../services/journal';
import { Journal } from '../../../service/src/app/journal/journal.interface'

import type { RootState } from '../store';

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
        const response = await getJournals(params)
        return response.data;
    });

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
            });
    }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setModalForm,
} = journalSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectName = (state: RootState) => state.journal.name;
export const selectPrice = (state: RootState) => state.journal.price;

// exporting the reducer here, as we need to add this to the store
export default journalSlice.reducer;