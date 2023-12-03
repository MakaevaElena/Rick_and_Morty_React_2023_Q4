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
  const [isChecked, setIsChecked] = useState(false);
  const [maleGender, setMaleGender] = useState(false);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const genderFemaleRef = React.useRef<HTMLInputElement>(null);
  const genderMaleRef = React.useRef<HTMLInputElement>(null);
  const acceptRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordRepeatRef = React.useRef<HTMLInputElement>(null);
  const pictureRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLInputElement>(null);

  const onValidate = () => {
    return schema.validate({
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_repeat: passwordRepeatRef.current?.value,
      gender: genderMaleRef.current?.checked
        ? genderMaleRef.current?.value
        : genderFemaleRef.current?.value,
      accept: isChecked,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
              gender: genderMaleRef.current?.checked
                ? genderMaleRef.current?.value
                : genderFemaleRef.current?.value,
              accept: isChecked,
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

  const changeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const changeMaleGender = () => {
    setMaleGender(!maleGender);
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
              <input type="text" id="email" ref={emailRef} defaultValue="myname@mail.xx" />
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
                <input
                  type="radio"
                  id="gender_femail"
                  name="gender"
                  value="femail"
                  ref={genderFemaleRef}
                />
                <label htmlFor="gender_femail">femail</label>
              </div>

              <div className={style['form-row']}>
                <input
                  type="radio"
                  id="gender_male"
                  name="gender"
                  value="male"
                  ref={genderMaleRef}
                  checked={true}
                  onChange={changeMaleGender}
                />
                <label htmlFor="gender_male">male</label>
              </div>
            </fieldset>

            <div className={style['form-row']}>
              <label htmlFor="accept">
                I agree to{' '}
                <Link to="" className={style['accept-link']}>
                  terms and conditions
                </Link>
              </label>
              <input type="checkbox" id="accept" ref={acceptRef} onChange={changeCheckbox} />
            </div>

            <div className={style['form-row']}>
              <label htmlFor="picture">picture</label>
              <input type="file" id="picture" ref={pictureRef} />
            </div>

            <div className={style['form-row']}>
              <label htmlFor="country-list">country</label>
              <input list="country" id="country-list" ref={countryRef} />
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
