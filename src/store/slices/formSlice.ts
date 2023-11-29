import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../store/types';

const initialState: FormState = {
  name: '',
  age: 18,
  email: '',
  password: '',
  password_repeat: '',
  gender: '',
  accept: true,
  picture: '',
  country: '',
};

const dataSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = dataSlice.actions;
export default dataSlice.reducer;
