import * as React from 'react';

import { IIcon } from '../types';

import * as css from './main.module.css';

const Trash : React.FC<IIcon> = (props) => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default Trash;
