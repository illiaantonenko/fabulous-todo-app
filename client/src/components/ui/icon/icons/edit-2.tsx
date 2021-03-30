import * as React from 'react';

import { IIcon } from '../types';

import * as css from './main.module.css';

const Edit : React.FC<IIcon> = (props) => (
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
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export default Edit;
