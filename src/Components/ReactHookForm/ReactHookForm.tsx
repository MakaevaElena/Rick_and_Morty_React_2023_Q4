import Navigation from '../Navigation/Navigation';
import style from './style.module.scss';

const ReactHookForm: React.FC = () => {
  return (
    <div className={style['main-container']}>
      <Navigation />
      <h2>ReactHookForm</h2>
      <div className={style['form-container']}>ReactHookForm</div>
    </div>
  );
};

export default ReactHookForm;
