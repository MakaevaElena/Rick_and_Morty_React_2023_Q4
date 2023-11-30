import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
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

// const INPUTS = [
//   { inputName: 'name', inputType: 'text' },
//   { inputName: 'age', inputType: 'number' },
//   { inputName: 'email', inputType: 'email' },
//   { inputName: 'password', inputType: 'text' },
//   { inputName: 'password_repeat', inputType: 'text' },
//   { inputName: 'gender', inputType: 'text' },
//   { inputName: 'accept', inputType: 'text' },
//   { inputName: 'picture', inputType: 'text' },
//   { inputName: 'country', inputType: 'text' },
// ];

interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  password_repeat: string;
  gender: string;
  accept: boolean;
  picture: FileList;
  country: string;
}

const ReactHookForm: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      password: '',
      password_repeat: '',
      gender: '',
      accept: true,
      // picture: ,
      country: '',
    },
  });

  const submit: SubmitHandler<Form> = async (data) => {
    // dispatch(setData(data));
    if (data.name) dispatch(setName(data.name));
    if (data.age) dispatch(setAge(data.age));
    if (data.email) dispatch(setEmail(data.email));
    if (data.password) dispatch(setPassword(data.password));
    if (data.password_repeat) dispatch(setPasswordRepeat(data.password_repeat));
    if (data.gender) dispatch(setGender(data.gender));
    // dispatch(setGender(data.gender));
    if (data.picture.length > 0) dispatch(setPicture(await getBase64(data.picture[0])));
    if (data.country) dispatch(setCountry(data.country));
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
            <div className={styles['form-row']}>
              <label htmlFor="age">age</label>
              <input type="number" {...register('age')} id="age" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="email">email</label>
              <input type="email" {...register('email')} id="email" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" {...register('password')} id="password" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="password_repeat">repeat password</label>
              <input type="password" {...register('password_repeat')} id="password_repeat" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="gender_male">male</label>
              <input type="radio" {...register('gender')} id="gender_male" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="gender_femail">femail</label>
              <input type="radio" {...register('gender')} id="gender_femail" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="accept">accept</label>
              <input type="checkbox" {...register('email')} id="accept" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" {...register('picture')} id="picture" />
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="country">country</label>
              <select {...register('country')} id="country">
                <option value="">--Please choose an option--</option>
                <option value="London">London</option>
                <option value="Moscow">Moscow</option>
              </select>
            </div>
            <div className={styles['form-row']}>
              <button type="submit">Submit</button>
            </div>
            {/* {errors.files && <div className={styles.error}>{errors.files.message}</div>} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default ReactHookForm;
