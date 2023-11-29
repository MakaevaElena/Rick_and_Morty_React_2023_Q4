import Navigation from '../Navigation/Navigation';
import style from './style.module.scss';

const UnControlledForm: React.FC = () => {
  return (
    <div className={style['main-container']}>
      <Navigation />
      <h2>UnControlledForm</h2>
      <div className={style['form-container']}>UnControlledForm</div>
    </div>
  );
};

export default UnControlledForm;
