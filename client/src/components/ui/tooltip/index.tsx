import * as React from 'react';

import * as css from './main.module.css';

interface IProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  trigger: 'click' | 'focus' | 'hover';
  target: any;
  text: string;
}

interface IState {
  shown: boolean;
}

class Tooltip extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      shown: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setEventListenes = this.setEventListenes.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);

    this.classNames = this.classNames.bind(this);
  }

  componentDidUpdate(prevProps: IProps) {
    const { target } = this.props;

    if (!prevProps.target && target) {
      this.setEventListenes();
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  setEventListenes() {
    const { trigger, target } = this.props;

    switch (trigger) {
      case 'hover': {
        target.addEventListener('mouseenter', this.open);
        target.addEventListener('mouseleave', this.close);
        break;
      } case 'focus': {
        target.addEventListener('focus', this.open);
        target.addEventListener('blur', this.close);
        break;
      } case 'click': {
        target.addEventListener('click', this.toggle);
        break;
      }
      default: return null;
    }
  }

  removeEventListeners() {
    const { trigger, target } = this.props;

    if (target) {
      switch (trigger) {
        case 'hover': {
          target.removeEventListener('mouseenter', this.open);
          target.removeEventListener('mouseleave', this.close);
          break;
        } case 'focus': {
          target.removeEventListener('focus', this.open);
          target.removeEventListener('blur', this.close);
          break;
        } case 'click': {
          target.removeEventListener('click', this.toggle);
          break;
        }
        default: return null;
      }
    }
  }

  classNames() {
    const classNames = [];

    classNames.push(css.wrapper);

    if (this.state.shown) classNames.push(css.shown);

    classNames.push(css[this.props.position]);

    return classNames.join(' ');
  }

  open() {
    this.setState({ shown: true });
  }

  close() {
    this.setState({ shown: false });
  }

  toggle() {
    const { shown } = this.state;

    this.setState({ shown: !shown });
  }

  render() {
    return (
      <div className={this.classNames()}>
        <span className={css.arrow} />
        <p className={css.content}>
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default Tooltip;
