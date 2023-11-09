import { ButtonProps } from './types';
import './style.scss';

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
