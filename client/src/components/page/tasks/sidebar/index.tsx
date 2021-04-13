import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { TYPES } from '../../../../core/system/user';
import { Typography } from '../../../ui';

import * as css from './main.module.css';

interface IProps {
  username?: TYPES.IUser['username'];
  email?: TYPES.IUser['email'];
}

const Sidebar : React.FC<IProps> = (props: IProps) => (
  <div className={css.sidebar}>
    <img className={css.bg_image} src={`${process.env.ASSETS_URL}/img/sidebar.jpeg`} alt="Sidebar image" />
    <div className={css.user}>
      <Typography tag="h3" color="white_2" weight="light">
        {props.username || 'Guest'}
      </Typography>
      <Typography tag="p" color="ash_2" className={css.contact}>
        {props.email || ' '}
      </Typography>
    </div>
    <div className={css.menu_wrapper}>
      <ul className={css.menu}>
        <li>
          <NavLink exact to="/" className={css.link} activeClassName={css.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/tasks" className={css.link} activeClassName={css.active}>
            Your tasks
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/history" className={css.link} activeClassName={css.active}>
            Your history
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/settings" className={css.link} activeClassName={css.active}>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
