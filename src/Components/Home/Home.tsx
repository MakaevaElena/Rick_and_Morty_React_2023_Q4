import { useAppSelector } from '../../store/slices/hooks';
import ResultTable from '../ResultTable/ResultTable';
import styles from './style.module.scss';

const Home: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);
  return (
    <>
      <div>
        <h2 className={styles['result-title']}>What all cats dream about...</h2>
      </div>
      <div className={styles['home-container']}>
        {data.map((resultData, i) => (
          <ResultTable key={i} data={resultData} blockStyles={i === data.length - 1 ? 'new' : ''} />
        ))}
      </div>
    </>
  );
};

export default Home;
