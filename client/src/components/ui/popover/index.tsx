import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IProps {
  mountpoint: React.RefObject<HTMLDivElement> | null;
  opened: boolean;
  closeHandler?: () => void;
}

class Popover extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      opened: props.opened,
    };

    this.escapeHandler = this.escapeHandler.bind(this);
  }

  componentDidMount() {
    const { closeHandler, mountpoint } = this.props;
    const target = mountpoint
      && mountpoint.current;

    if (closeHandler) {
      window.addEventListener('keyup', this.escapeHandler);
    }

    if (target) {
      target.scrollTop = 0;
      target.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    const { mountpoint } = this.props;
    const target = mountpoint
      && mountpoint.current;

    window.removeEventListener('keyup', this.escapeHandler);

    if (target) {
      target.scrollTop = 0;
      target.style.overflow = '';
    }
  }

  escapeHandler(event : KeyboardEvent) {
    const { closeHandler } = this.props;

    if (event.code === 'Escape' && closeHandler) closeHandler();
  }

  render() {
    const { mountpoint, opened, children } = this.props;
    let target;

    if (mountpoint && mountpoint.current) target = mountpoint.current;
    else target = window.document.body;

    return opened && ReactDOM.createPortal(children, target);
  }
}

export default Popover;
