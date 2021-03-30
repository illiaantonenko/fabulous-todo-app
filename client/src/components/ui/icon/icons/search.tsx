import * as React from 'react';

import { IIcon } from '../types';

import * as css from './main.module.css';

const Plus : React.FC<IIcon> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox={props.size ? `0 0 ${props.size} ${props.size}` : '0 0 24 24'}
    fill="none"
    stroke="currentColo"
    strokeWidth={props.width || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${css[props.color]} ${props.className ? props.className : ''}`}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default Plus;
