import React, { useEffect, useState } from 'react';
import './style.scss';

const Button: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  function handleClick() {
    setHasError(true);
  }

  useEffect(() => {
    if (hasError === true) {
      throw new Error('Test Boundary Error');
    }
  }, [hasError]);

  return (
    <button className="button" onClick={handleClick}>
      TestErrorButton
    </button>
  );
};

export default Button;
