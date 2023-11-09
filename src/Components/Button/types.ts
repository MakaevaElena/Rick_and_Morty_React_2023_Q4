import { CSSProperties } from 'react';

export type ButtonProps = {
  style?: CSSProperties;
  children?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  dataTestid?: string;
};
