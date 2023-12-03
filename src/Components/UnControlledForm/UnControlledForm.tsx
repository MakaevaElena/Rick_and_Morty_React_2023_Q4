import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import { getBase64 } from '../../utils/getBase64';
import { setData } from '../../store/slices/formSlice';
import { schema } from '../../yup/schema';
import { COUNTRIES } from '../../constants';

const UnControlledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const [country, setCountry] = useState('');

  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const genderRef = React.useRef<HTMLInputElement>(null);
  const acceptRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordRepeatRef = React.useRef<HTMLInputElement>(null);
  const pictureRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLInputElement>(null);

  const onValidate = () => {
    console.log(acceptRef.current?.value);
    return schema.validate({
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_repeat: passwordRepeatRef.current?.value,
      gender: genderRef.current?.value,
      accept: acceptRef.current?.value == 'on' ? true : false,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log(acceptRef.current?.value);

    onValidate()
      .then(async () => {
        if (pictureRef.current?.files && pictureRef.current?.files?.length > 0) {
          const pictureInBase64 = await getBase64(pictureRef.current?.files[0]);

          dispatch(
            setData({
              name: nameRef.current?.value,
              age: ageRef.current?.value,
              email: emailRef.current?.value,
              password: passwordRef.current?.value,
              password_repeat: passwordRepeatRef.current?.value,
              gender: genderRef.current?.value,
              accept: acceptRef.current?.value == 'on' ? true : false,
              picture: pictureInBase64,
              country: countryRef.current?.value,
            })
          );
        }
        navigate(`/Home`);
      })
      .catch((error) => {
        setErrors(error.message);
      });
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
                <input type="text" id="name" ref={nameRef} defaultValue="Myname" />
              </div>
            </div>
            <div className={style['form-row']}>
              <label htmlFor="age">age</label>
              <input type="number" id="age" ref={ageRef} defaultValue="18" />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="email">email</label>
              <input type="email" id="email" ref={emailRef} defaultValue="myname@mail.xx" />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" id="password" ref={passwordRef} defaultValue="123!@#qweQWE" />
            </div>
            <div className={style['form-row']}>
              <label htmlFor="password_repeat">repeat password</label>
              <input
                type="password"
                id="password_repeat"
                ref={passwordRepeatRef}
                defaultValue="123!@#qweQWE"
              />
            </div>

            <fieldset>
              <legend>Select a gender:</legend>
              <div className={style['form-row']}>
                <input type="radio" id="gender_male" name="gender" value="male" ref={genderRef} />
                <label htmlFor="gender_male">male</label>
              </div>

              <div className={style['form-row']}>
                <input
                  type="radio"
                  id="gender_femail"
                  name="gender"
                  value="femail"
                  ref={genderRef}
                />
                <label htmlFor="gender_femail">femail</label>
              </div>
            </fieldset>

            <div className={style['form-row']}>
              <label htmlFor="accept">
                I agree to{' '}
                <Link to="" className={style['accept-link']}>
                  terms and conditions
                </Link>
              </label>
              <input type="checkbox" ref={acceptRef} />
            </div>

            <div className={style['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" id="picture" ref={pictureRef} />
            </div>

            <div className={style['form-row']}>
              <label htmlFor="country-list">country</label>
              <input
                list="country"
                id="country-list"
                ref={countryRef}
                value={country}
                onChange={(evt) => {
                  if (evt.target instanceof HTMLInputElement) setCountry(evt.target.value);
                }}
              />
              <datalist id="country">
                {COUNTRIES.map((item, key) => (
                  <option key={key} value={item} />
                ))}
              </datalist>
            </div>
            <div className={style['error-message']}>{errors}</div>
            <div className={style['form-row']}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UnControlledForm;
