import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCampers = createAsyncThunk('campers/fetchCampers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
    return response.data.items || [];
  } catch (error) {
    console.error('Failed to fetch campers:', error);
    return rejectWithValue(error.message);
  }
});

export const fetchCamperById = createAsyncThunk('campers/fetchCamperById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch camper:', error);
    return rejectWithValue(error.message);
  }
});

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    currentCamper: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.currentCamper = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
