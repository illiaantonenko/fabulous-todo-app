import * as React from 'react';

import css from './main.module.css';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'number' | 'hidden';
  required: boolean;
  name: string;

  validation?: string[];
  value?: string | number;
  label?: string;
  className?: string;
  form?: string;

  onChange?(param: any): void;
}

interface IState {
  valid: boolean;
  focused: boolean;
  value: string | number;
}

class Field extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      valid: this.props.required ? !!this.props.value : true,
      focused: !!props.value || false,
      value: this.props.value || '',
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevState.value !== this.state.value) this.validate();
  }

  focusIn = () => {
    this.setState({ focused: true });
  };

  focusOut = () => {
    if (!this.state.valid) {
      this.setState({ focused: false });
    }
  };

  validate = () => {
    const { required } = this.props;

    if (required) {
      if (this.state.value) this.setState({ valid: true });
      else this.setState({ valid: false });
    } else {
      this.setState({ valid: true });
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    this.setState({ value: e.target.value });

    onChange && onChange(e);
  };

  generateInput = () => {
    const {
      type,
      name,
      form,
      validation,
      ...other
    } = this.props;
    const { value } = this.state;

    return (
      <input
        // tslint:disable-next-line: prefer-template
        id={`${form ? `${form}-` : ''}${name}-field`}
        {...other}
        name={name}
        type={type}
        value={value}

        onChange={this.onChange}
        onFocus={this.focusIn}
        onBlur={this.focusOut}

        className={css.input}
      />
    );
  };

  generateWrapper = (inner : React.InputHTMLAttributes<HTMLInputElement>) => {
    const {
      type, name, label, className,
    } = this.props;
    const { focused } = this.state;

    let wrapper = (
      <>
        {inner}
      </>
    );

    if (type !== 'hidden') {
      wrapper = (
        <div className={`${css.field_wrapper} ${focused ? css.focus : ''} ${className || ''}`}>
          {label && (
          <label className={css.label} htmlFor={`${name}-field`}>{label}</label>
          )}
          <div className={css.input_block}>
            {inner}
          </div>
          <div className="error_block" />
        </div>
      );
    }

    return wrapper;
  };

  render() {
    return this.generateWrapper(this.generateInput());
  }
}

export default Field;
