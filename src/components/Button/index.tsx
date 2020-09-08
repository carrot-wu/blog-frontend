import React, { CSSProperties, MouseEventHandler } from 'react';
import './styles.scss';

interface ButtonProps {
  children: React.ReactElement | string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  className?: string;
  type?: 'primary' | 'normal';
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className = '', style, onClick, type = 'primary' } = props;
  return (
    <div className={`myButton myButton-${type} ${className}`} style={style} onClick={onClick}>
      <span>{props.children}</span>
    </div>
  );
};

export default Button;
