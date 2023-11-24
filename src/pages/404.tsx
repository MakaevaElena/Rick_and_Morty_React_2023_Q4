import PageNotFound from '@/Components/PageNotFound/PageNotFound';
import Searching from '../Components/Searching/Searching';

const Page404: React.FC = () => {
  return (
    <>
      <Searching />
      <PageNotFound />
      <h1>Page Not Found</h1>
    </>
  );
};

export default Page404;
