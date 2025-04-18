import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  genreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: 'currentQuerySlice',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetPage: state => {
      state.page = 1;
    },
    selectQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetQuery: () => ({
      ...initialState,
    }),
  },
});

export default currentQuerySlice.reducer;
export const { setPage, resetPage, selectQuery, resetQuery } =
  currentQuerySlice.actions;
