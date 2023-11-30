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
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action) => {
      state.password_repeat = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAccept: (state, action) => {
      state.accept = action.payload;
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setAccept,
  setCountry,
  setGender,
  setPassword,
  setPasswordRepeat,
  setPicture,
  setAge,
} = dataSlice.actions;
export default dataSlice.reducer;
