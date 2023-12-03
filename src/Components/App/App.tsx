import UnControlledForm from '../UnControlledForm/UnControlledForm';
import Home from '../Home/Home';
import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import ReactHookForm from '../ReactHookForm/ReactHookForm';
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <div className={styles['container']}>
      <Navigation />
      <div className={styles['content']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path={`/ReactHookForm/`} element={<ReactHookForm />} />
          <Route path={`/UnControlledForm/`} element={<UnControlledForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
