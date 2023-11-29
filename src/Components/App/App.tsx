import UnControlledForm from '../UnControlledForm/UnControlledForm';
import Home from '../Home/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import ReactHookForm from '../ReactHookForm/ReactHookForm';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path={`/ReactHookForm/`} element={<ReactHookForm />} />
        <Route path={`/UnControlledForm/`} element={<UnControlledForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
