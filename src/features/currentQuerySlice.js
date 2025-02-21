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
  },
});

export default currentQuerySlice.reducer;
export const { setPage, resetPage } = currentQuerySlice.actions;
