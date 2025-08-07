import 'animate.css';
import { ReactNode } from 'react';

interface BoxShadowProps {
  children: ReactNode;
}

export const BoxShadow = ({ children }: BoxShadowProps) => {
  return <div className="box-shadow-layout animate__animated animate__fadeIn animate_faster">{children}</div>;
};
