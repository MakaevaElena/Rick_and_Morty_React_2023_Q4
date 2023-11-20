import { ButtonProps } from './types';
// import './style.scss';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      data-testid={props.dataTestid}
      className={`button ${props.style}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
