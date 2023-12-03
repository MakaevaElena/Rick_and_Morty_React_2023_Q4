import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-ZА-Я][a-zа-я]*$/)
      .required('required'),
    age: yup.number().positive().integer().required('name required'),
    email: yup
      .string()
      .email('email format need to be xxx@xx.xx')
      .matches(/[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)
      .required('email required'),
    password: yup
      .string()
      .test('is strong password', 'password in not strong', (password) => {
        if (password) return password?.length > 15;
      })
      .test(
        'password format',
        'should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
        (password) => {
          if (password)
            return /(?=(.*[0-9]))(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm.test(
              password
            );
        }
      )
      .defined()
      .required('password required'),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password')], 'passwords not match')
      .required('password_repeat required'),
    gender: yup.string().required('please choose gender'),
    accept: yup
      .boolean()
      .test('accept the terms', 'Please accept the terms', (accept) => {
        return accept === true;
      })
      .required('accept required'),
    picture: yup
      .mixed<FileList>()
      .test('fileExist', 'Please upload picture', (file) => {
        return !!file && !!file[0];
      })
      .test('fileFormat', 'The file is wrong format', (file) => {
        if (file && file[0]) {
          return (file && file[0].type === 'image/jpeg') || (file && file[0].type === 'image/png');
        }
      })
      .test('fileSize', 'The file is too large', (file) => {
        if (file && file[0]) {
          return file && file[0].size <= 1024 * 1024;
        }
      })
      .defined()
      .required('please upload picture'),
    country: yup
      .string()
      .test('is country chosen', 'please choose country', (country) => {
        if (country) return country.length > 0;
      })
      .defined()
      .required('please choose country'),
  })
  .required();
