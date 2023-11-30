import React from 'react';
import { useDispatch } from 'react-redux';
import style from './style.module.scss';
import { getBase64 } from '../../utils/getBase64';
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

const UnControlledForm: React.FC = () => {
  const dispatch = useDispatch();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const genderRef = React.useRef<HTMLInputElement>(null);
  // const genderFemaleRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordRepeatRef = React.useRef<HTMLInputElement>(null);
  const pictureRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLSelectElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameRef.current?.value) dispatch(setName(nameRef.current?.value));
    if (ageRef.current?.value) dispatch(setAge(ageRef.current?.value));
    if (emailRef.current?.value) dispatch(setEmail(emailRef.current?.value));
    if (passwordRef.current?.value) dispatch(setPassword(passwordRef.current?.value));
    if (passwordRepeatRef.current?.value)
      dispatch(setPasswordRepeat(passwordRepeatRef.current?.value));
    if (genderRef.current?.value) dispatch(setGender(genderRef.current?.value));
    if (pictureRef.current?.files && pictureRef.current?.files?.length > 0)
      dispatch(setPicture(await getBase64(pictureRef.current?.files[0])));
    if (countryRef.current?.value) dispatch(setCountry(countryRef.current?.value));
  };

  return (
    <>
      <h2 className={style['tytle']}>UnControlled Form</h2>
      <div className={style['form-container']}>
        <div></div>
        <div className={style['form']}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={style['form-row']}>
              <div>
                <label htmlFor="name">name</label>
              </div>
              <div>
                <input type="text" id="name" ref={nameRef} />
              </div>
            </div>
            <div className={style['form-row']}>
              <label htmlFor="age">age</label>
              <input type="number" id="age" ref={ageRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="email">email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" id="password" ref={passwordRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="password_repeat">repeat password</label>
              <input type="password" id="password_repeat" ref={passwordRepeatRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="gender_male" defaultChecked>
                male
              </label>
              <input name="gender" type="radio" id="gender_male" ref={genderRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="gender_femail">femail</label>
              <input name="gender" type="radio" id="gender_femail" ref={genderRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="accept">accept</label>
              <input type="checkbox" id="accept" />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" id="picture" ref={pictureRef} />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="country">country</label>
              <select name="country" id="country" ref={countryRef}>
                <option value="">--Please choose an option--</option>
                <option value="London" defaultChecked>
                  London
                </option>
                <option value="Moscow">Moscow</option>
              </select>
            </div>
            <div className={style['form-row']}>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UnControlledForm;
