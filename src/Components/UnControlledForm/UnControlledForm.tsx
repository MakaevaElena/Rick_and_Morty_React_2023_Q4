import style from './style.module.scss';

const UnControlledForm: React.FC = () => {
  const handleSubmit = () => {
    console.log();
  };

  return (
    <div className={style['form-container']}>
      <h2 className={style['tytle']}>UnControlledForm</h2>
      <form onSubmit={handleSubmit}>
        <div className={style['form-row']}>
          <div>
            <label htmlFor="name">name</label>
          </div>
          <div>
            <input type="text" id="name" />
          </div>
        </div>
        <div className={style['form-row']}>
          <label htmlFor="age">age</label>
          <input type="number" id="age" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="email">email</label>
          <input type="email" id="email" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="password_repeat">repeat password</label>
          <input type="password" id="password_repeat" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="gender_male">male</label>
          <input type="radio" id="gender_male" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="gender_femail">femail</label>
          <input type="radio" id="gender_femail" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="accept">accept</label>
          <input type="checkbox" id="accept" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="picture">picture</label>
          <input type="file" id="picture" />
        </div>
        <div className={style['form-row']}>
          <label htmlFor="country">country</label>
          <select id="country">
            <option value="">--Please choose an option--</option>
            <option value="London">London</option>
            <option value="Moscow">Moscow</option>
          </select>
        </div>
        <div className={style['form-row']}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UnControlledForm;
