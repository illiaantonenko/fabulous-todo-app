import * as React from 'react';

import { Field, Button, Typography } from '../../../ui';

import css from './main.module.css';

interface IProps {
  toggle(): any;
  onSubmit: (prop: any) => any;
}

class AuthForm extends React.Component<IProps> {
  inputs: Record<string, React.RefObject<Field>>;

  name: string;

  constructor(props: IProps) {
    super(props);

    this.name = 'register';

    this.inputs = {
      email: React.createRef(),
      password: React.createRef(),
      username: React.createRef(),
    };

    this.formOnSubmit = this.formOnSubmit.bind(this);
  }

  formOnSubmit(e : React.FormEvent) {
    e.preventDefault();

    const payload : Record<string, any> = {};
    let valid = true;

    Object.keys(this.inputs).forEach((key) => {
      const target = this.inputs[key].current;

      if (!target || !target.state.valid) valid = false;
      target && (
        payload[key] = target.state.value
      );
    });

    if (valid) {
      this.props.onSubmit(payload);
    } else console.log('not submit');
  }

  render() {
    return (
      <form id={this.name} onSubmit={this.formOnSubmit} className={css.auth_form}>
        <Field
          name="username"
          label="Username"
          type="text"
          required
          ref={this.inputs.username}
          className={css.field}
          form={this.name}
        />
        <Field
          name="email"
          label="E-mail"
          type="text"
          required
          ref={this.inputs.email}
          className={css.field}
          form={this.name}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          required
          ref={this.inputs.password}
          className={css.field}
          form={this.name}
        />
        <div className={css.control_block}>
          <Button
            color="ash"
            type="button"
            onClick={this.props.toggle}
          >
            Log in
          </Button>
          <Typography
            tag="span"
            color="ash"
            className={css.or_text}
          >
            or
          </Typography>
          <Button
            color="sky"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
    );
  }
}

export default AuthForm;
