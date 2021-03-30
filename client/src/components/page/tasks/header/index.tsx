import * as React from 'react';

import { Icon, Typography } from '../../../ui';
import Add from '../add';

import * as css from './main.module.css';

interface IProps {
  mountpoint: React.RefObject<HTMLDivElement>;
}

const Header : React.FC<IProps> = (props) => (
  <div className={css.header}>
    <div className={css.logo}>
      <Icon type="BarChart" color="sky" width={1} />
      <Typography className={css.logo_text} tag="h3" color="sky" weight="light">
        Logo
      </Typography>
    </div>
    {props.children}
  </div>
);

export default Header;
