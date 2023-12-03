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
  name: '',
  age: 18,
  email: '',
  password: '',
  password_repeat: '',
  gender: '',
  accept: false,
  picture: '',
  country: '',
};

const dataSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setData: (state, action) => {
      // state.data = action.payload;
      state.data.push(action.payload);
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
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
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const {
  setData,
  setPicture,
  setName,
  setEmail,
  setAccept,
  setCountry,
  setGender,
  setPassword,
  setPasswordRepeat,
  setAge,
} = dataSlice.actions;
export default dataSlice.reducer;
