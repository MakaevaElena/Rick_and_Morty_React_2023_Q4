// import React, { useState } from 'react';
import { ButtonProps } from './types';
import './style.scss';

const Button: React.FC<ButtonProps> = (props) => {
  // const [hasError, setHasError] = useState<boolean>(false);

  // function handleClick() {
  //   setHasError(true);
  // }

  // useEffect(() => {
  //   if (hasError === true) {
  //     throw new Error('Test Boundary Error');
  //   }
  // }, [hasError]);

  return (
    <button className="button" onClick={props.onClick}>
      {/* TestErrorButton */}
      {props.children}
    </button>
  );
};

export default Button;
