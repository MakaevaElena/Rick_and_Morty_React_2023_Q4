import ResultTable from '../ResultTable/ResultTable';
import styles from './style.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles['home-conteiner']}>
      <ResultTable />
    </div>
  );
};

export default Home;
