import * as React from 'react';

import { Tag, Color, Weight } from '../types';

import css from './main.module.css';

export interface ITypography {
  tag: Tag;
  color?: Color;
  weight?: Weight;
  className?: string;
}

const Typography : React.FC<ITypography> = ({
  tag, color, weight, children, ...props
}) => React.createElement(
  tag,
  {
    ...props,
    className: `${css[tag]} color_${color || 'black'} weight_${weight || 'regular'} ${props.className ? props.className : ''}`,
  },
  children,
);

export default Typography;
