import * as React from 'react';

import { IIcon } from '../types';

import * as css from './main.module.css';

const Feather : React.FC<IIcon> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox={props.size ? `0 0 ${props.size} ${props.size}` : '0 0 24 24'}
    fill="none"
    stroke="currentColor"
    strokeWidth={props.width || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${css[props.color]} ${props.className ? props.className : ''}`}
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

export default Feather;
