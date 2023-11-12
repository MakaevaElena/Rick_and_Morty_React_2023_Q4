import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';

const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  function handleClick() {
    setHasError(true);
  }

  useEffect(() => {
    if (hasError === true) {
      throw new Error('Test Boundary Error');
    }
  }, [hasError]);

  return <Button dataTestid="error-button" children="TestErrorButton" onClick={handleClick} />;
};

export default ErrorButton;
