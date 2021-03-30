import * as React from 'react';

import { Typography } from '../../../ui';

import Form from './form';
import css from './main.module.css';

interface IAuthorization {
  toggle: () => void;
  onSubmit: (prop: any) => any;
}

const Authorization : React.FC<IAuthorization> = (props) => (
  <div className={css.auth_block}>
    <div className={css.auth_container}>
      <Typography tag="h2" weight="light" color="black" className={css.title}>
        Sign in your account
      </Typography>
      <Typography tag="p" weight="regular" color="sky" className={css.description}>
        Fill this form to enter application
        and start building your dream.
      </Typography>
      <div>
        <Form
          toggle={props.toggle}
          onSubmit={props.onSubmit}
        />
      </div>
    </div>
  </div>
);

export default Authorization;
