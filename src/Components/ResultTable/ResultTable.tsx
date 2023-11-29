import style from './style.module.scss';

const ResultTable: React.FC = () => {
  return (
    <div className={style['result-table']}>
      <h3>Name:</h3>
      <h3>Second Name:</h3>
      <h3>Age:</h3>
    </div>
  );
};

export default ResultTable;
