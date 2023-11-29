import Navigation from '../Navigation/Navigation';
import ResultTable from '../ResultTable/ResultTable';
import style from './style.module.scss';

const Home: React.FC = () => {
  return (
    <div className={style['main-container']}>
      <Navigation />
      <ResultTable />
    </div>
  );
};

export default Home;
