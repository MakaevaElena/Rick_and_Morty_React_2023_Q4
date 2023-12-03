import { Link } from 'react-router-dom';
import style from './style.module.scss';

const Navigation: React.FC = () => {
  const LINKS = ['Home', 'ReactHookForm', 'UnControlledForm'];

  return (
    <div className="navigation">
      <div className={style['navigation-buttons']}>
        {LINKS.map((link, i) => (
          <Link key={i + 1} to={`/${link}`} className={style[`navigation-button ${link}`]}>
            <div key={link} id={`link`}>
              {link}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
