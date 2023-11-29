import { SubmitHandler, useForm } from 'react-hook-form';
import style from './style.module.scss';

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
  picture: string;
  country: string;
}

const ReactHookForm: React.FC = () => {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      password: '',
      password_repeat: '',
      gender: '',
      accept: true,
      picture: '',
      country: '',
    },
  });

  const submit: SubmitHandler<Form> = (data) => {
    console.log(data);
    console.log('submit');
  };

  return (
    <div className={style['form-container']}>
      <h2 className={style['tytle']}>ReactHookForm</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className={style['form-row']}>
          <div>
            <label htmlFor="name">name</label>
          </div>
          <div>
            <input type="text" {...register('name')} id="name" />
          </div>
        </div>
        <div className={style['form-row']}>
          <label htmlFor="age">age</label>
          <input type="number" {...register('age')} id="age" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="email">email</label>
          <input type="email" {...register('email')} id="email" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="password">password</label>
          <input type="password" {...register('password')} id="password" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="password_repeat">repeat password</label>
          <input type="password" {...register('password_repeat')} id="password_repeat" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="gender_male">male</label>
          <input type="radio" {...register('gender')} id="gender_male" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="gender_femail">femail</label>
          <input type="radio" {...register('gender')} id="gender_femail" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="accept">accept</label>
          <input type="checkbox" {...register('email')} id="accept" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="picture">picture</label>
          <input type="file" {...register('picture')} id="picture" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="country">country</label>
          <select {...register('country')} id="country">
            <option value="">--Please choose an option--</option>
            <option value="London">London</option>
            <option value="Moscow">Moscow</option>
          </select>
        </div>
        <div className={style['form-row']}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReactHookForm;
