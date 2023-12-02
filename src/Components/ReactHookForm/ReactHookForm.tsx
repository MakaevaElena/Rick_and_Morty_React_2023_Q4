import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
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
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-ZА-Я][a-zа-я]*$/)
    .required('required'),
  age: yup.number().positive().integer(),
  // email: yup.string().email().required('Email is required'),
  email: yup.string().email('email wrong format'),
  // .email()
  // .matches(/^(?!\@*.)/),
  // .required('Email is required'),
  // email: yup
  //   .string()
  //   .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w)$/, { excludeEmptyString: true })
  //   .required('Email is required'),
  password: yup.string().matches(
    // /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm,
    / (?=.*[0-9])|(?=.*[a-z])|(?=.*[A-Z])|(?=.*[!@#$%^&*])/,
    { excludeEmptyString: true }
  ),
  // .required('required'),
  password_repeat: yup.string().oneOf([yup.ref('password')], 'passwords not match'),
  gender: yup.string(),
  accept: yup.boolean(),
  // picture: yup.mixed().required('File is required'),
  picture: yup
    .mixed<FileList>()
    // .test('fileFormat', 'The file is wrong format', (file) => {
    //   if (file) {
    //     if (!['image/jpeg', 'image/png'].includes(file[0].type)) return true;
    //   }
    // })
    // .test('fileSize', 'The file is too large', (file) => {
    //   return file && file[0].size <= 1;
    // })
    .defined(),
  country: yup.string(),
});

// .required();

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
      accept: true,
      // picture: new FileList(),
      country: '',
    },
    resolver: yupResolver<Form>(schema),
  });

  const submit: SubmitHandler<Form> = async (data) => {
    console.log('data', data);
    // dispatch(setData(data));
    if (data.name) dispatch(setName(data.name));
    if (data.age) dispatch(setAge(data.age));
    if (data.email) dispatch(setEmail(data.email));
    if (data.password) dispatch(setPassword(data.password));
    if (data.password_repeat) dispatch(setPasswordRepeat(data.password_repeat));
    if (data.gender) dispatch(setGender(data.gender));
    // dispatch(setGender(data.gender));
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
              <p role="alert">{'validate for first uppercased letter and no space'}</p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="age">age</label>
              <input type="number" {...register('age')} id="age" />
            </div>
            {errors.age && <p role="alert">{'should be number, no negative values'}</p>}

            <div className={styles['form-row']}>
              <label htmlFor="email">email</label>
              <input type="email" {...register('email')} id="email" />
            </div>
            {errors.email && <p role="alert">{errors.email?.message}</p>}

            <div className={styles['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" {...register('password')} id="password" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="password_repeat">repeat password</label>
              <input type="password" {...register('password_repeat')} id="password_repeat" />
            </div>
            {errors.password && (
              <p role="alert">
                {
                  'should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
                }
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="gender_male">male</label>
              <input type="radio" {...register('gender')} id="gender_male" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="gender_femail">femail</label>
              <input type="radio" {...register('gender')} id="gender_femail" />
            </div>
            {errors.gender && <p role="alert">{errors.gender?.message}</p>}

            <div className={styles['form-row']}>
              <label htmlFor="accept">accept</label>
              <input type="checkbox" {...register('email')} id="accept" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" {...register('picture')} id="picture" />
            </div>
            {errors.picture && <p role="alert">{errors.picture?.message}</p>}

            <div className={styles['form-row']}>
              <label htmlFor="country-list">country</label>
              <input list="country" id="country-list" />
              <datalist {...register('country')} id="country">
                <option value="">--Please choose an option--</option>
                <option value="London">London</option>
                <option value="Moscow">Moscow</option>
              </datalist>
            </div>
            {errors.country && <p role="alert">{errors.country?.message}</p>}

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
