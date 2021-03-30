import * as React from 'react';

import { IIcon } from '../types';

import * as css from './main.module.css';

const EditSquare : React.FC<IIcon> = (props) => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default EditSquare;
