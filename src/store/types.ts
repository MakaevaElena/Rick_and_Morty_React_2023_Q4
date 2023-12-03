export type FormState = {
  data: ResultData[];
  name: string;
  age: number;
  email: string;
  password: string;
  password_repeat: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
};

export type ResultData = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_repeat: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
};
