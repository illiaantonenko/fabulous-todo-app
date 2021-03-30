import * as React from 'react';

import { Color } from '../types';

import css from './main.module.css';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  fill?: 'bordered' | 'solid' | 'blank';
  size?: 'big' | 'medium' | 'small';
}

const classNames = ({
  color = 'black_2',
  fill = 'bordered',
  size = 'medium',
} : IButton) => {
  // const { color, fill, size } = props;
  const classNames = [];

  classNames.push(css.button);

  classNames.push(css[color]);

  classNames.push(css[fill]);

  classNames.push(css[size]);

  return classNames.join(' ');
};

const Button : React.FC<IButton> = (props) => {
  const { color, fill, size } = props;

  return (
    <button
      {...props}
      className={classNames({ color, fill, size })}
    >
      {props.children}
    </button>
  );
};

export default Button;
