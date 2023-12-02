import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  setAccept,
  setAge,
  setCountry,
  setEmail,
  setGender,
  setName,
  setPassword,
  setPasswordRepeat,
  setPicture,
} from '../../store/slices/formSlice';
import { getBase64 } from '../../utils/getBase64';

// https://github.com/jquense/yup/issues/1183
// https://htmlacademy.ru/blog/js/regexp-howto
// https://stackoverflow.com/questions/54020719/validating-file-size-and-format-with-yup
const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-ZА-Я][a-zа-я]*$/)
      .required('required'),
    age: yup.number().positive().integer(),
    email: yup
      .string()
      .email('email format need to be xxx@xx.xx')
      .matches(/[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/),
    // /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm
    // /[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/
    password: yup.string().matches(
      // /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm,
      /(?=(.*[0-9]))(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm,
      {
        excludeEmptyString: true,
      }
    ),
    password_repeat: yup.string().oneOf([yup.ref('password')], 'passwords not match'),
    gender: yup.string(),
    accept: yup.boolean().test('accept the terms', 'Please accept the terms', (accept) => {
      return accept === true;
    }),
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
    country: yup.string(),
  })
  .required();

interface Form {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  password_repeat?: string;
  gender?: string;
  accept?: boolean;
  picture?: FileList;
  country?: string;
}

const ReactHookForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: 'Myname',
      age: 18,
      email: 'myname@mail.xx',
      password: '123!@#qweQWE',
      password_repeat: '123!@#qweQWE',
      gender: '',
      accept: false,
      // picture: new FileList(),
      // country: '',
    },
    resolver: yupResolver<Form>(schema),
  });

  const submit: SubmitHandler<Form> = async (data) => {
    console.log('data', data);
    if (data.name) dispatch(setName(data.name));
    if (data.age) dispatch(setAge(data.age));
    if (data.email) dispatch(setEmail(data.email));
    if (data.password) dispatch(setPassword(data.password));
    if (data.password_repeat) dispatch(setPasswordRepeat(data.password_repeat));
    if (data.gender) dispatch(setGender(data.gender));
    if (data.accept) dispatch(setAccept(data.accept));
    if (data.picture && data.picture.length > 0)
      dispatch(setPicture(await getBase64(data.picture[0])));
    if (data.country) dispatch(setCountry(data.country));
    navigate(`/Home`);
  };

  return (
    <>
      <h2 className={styles['tytle']}>React Hook Form</h2>
      <div className={styles['form-container']}>
        <div></div>

        <div className={styles['form']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['form-row']}>
              <div>
                <label htmlFor="name">name</label>
              </div>
              <div>
                <input type="text" {...register('name')} id="name" />
              </div>
            </div>
            {errors.name && (
              <p className={styles['error-message']} role="alert">
                {'validate for first uppercased letter and no space'}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="age">age</label>
              <input type="number" {...register('age')} id="age" />
            </div>
            {errors.age && (
              <p className={styles['error-message']} role="alert">
                {'should be number, no negative values'}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="email">email</label>
              <input type="text" {...register('email')} id="email" />
            </div>
            {errors.email && (
              <p className={styles['error-message']} role="alert">
                {errors.email?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" {...register('password')} id="password" />
            </div>
            {errors.password && (
              <p className={styles['error-message']} role="alert">
                {
                  'should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
                }
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="password_repeat">repeat password</label>
              <input type="password" {...register('password_repeat')} id="password_repeat" />
            </div>
            {errors.password_repeat && (
              <p className={styles['error-message']} role="alert">
                {'both passwords should match'}
              </p>
            )}

            <fieldset>
              <legend>Select a gender:</legend>
              <div className={styles['form-row']}>
                <input type="radio" id="gender_male" value="male" checked {...register('gender')} />
                <label htmlFor="gender_male">male</label>
              </div>
              <div className={styles['form-row']}>
                <input type="radio" id="gender_femail" value="femail" {...register('gender')} />
                <label htmlFor="gender_femail">femail</label>
              </div>
            </fieldset>
            {errors.gender && (
              <p className={styles['error-message']} role="alert">
                {errors.gender?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="accept">
                I agree to{' '}
                <Link to="" className={styles['accept-link']}>
                  terms and conditions
                </Link>
              </label>
              <input type="checkbox" {...register('accept')} id="accept" />
            </div>
            {errors.accept && (
              <p className={styles['error-message']} role="alert">
                {errors.accept?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" {...register('picture')} id="picture" />
            </div>
            {errors.picture && (
              <p className={styles['error-message']} role="alert">
                {errors.picture?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="country-list">country</label>
              <input list="country" id="country-list" {...register('country')} />
              <datalist id="country">
                <option value="NeverLand">NeverLand</option>
                <option value="Australia">Australia</option>
                <option value="Russia">Russia</option>
                <option value="Great Britain">Great Britain</option>
              </datalist>
            </div>
            {errors.country && (
              <p className={styles['error-message']} role="alert">
                {errors.country?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => clearErrors()}>
                Clear Error
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReactHookForm;
