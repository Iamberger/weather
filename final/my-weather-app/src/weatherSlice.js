import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    location: '',
    temperature: '',
    loading: false,
    error: '',
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, setTemperature, setLoading, setError } = weatherSlice.actions;

export const selectWeather = (state) => state.weather;

export default weatherSlice.reducer;
