import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../store/types';

const initialState: FormState = {
  data: [
    {
      name: '',
      age: 18,
      email: '',
      password: '',
      password_repeat: '',
      gender: '',
      accept: false,
      picture: '',
      country: '',
    },
  ],
};

const dataSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setData: (state, action) => {
      // state.data = action.payload;
      state.data.push(action.payload);
      console.log(action.payload);
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
