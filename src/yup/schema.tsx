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
    // /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm
    // /[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/
    password: yup
      .string()
      .matches(
        // /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm,
        /(?=(.*[0-9]))(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm,
        {
          excludeEmptyString: true,
        }
      )
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
    // picture: yup.mixed().required('File is required'),
    picture: yup
      .mixed<FileList>()
      .test('fileExist', 'Please upload picture', (file) => {
        return !!file && !!file[0];
      })
      .test('fileFormat', 'The file is wrong format', (file) => {
        if (file && file[0]) {
          // if (!['image/jpeg', 'image/png'].includes(file[0].type)) return false;
          return (file && file[0].type === 'image/jpeg') || (file && file[0].type === 'image/png');
        }
      })
      .test('fileSize', 'The file is too large', (file) => {
        if (file && file[0]) {
          // if (file && +file[0].size > 200000) return file && file[0].size <= 1;
          return file && file[0].size <= 1024 * 1024;
        }
      })
      .defined()
      .required('please upload picture'),
    country: yup.string().required('please choose country'),
  })
  .required();
