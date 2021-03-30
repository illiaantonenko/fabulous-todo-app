import * as React from 'react';

import { Button, Popover, Typography } from '../../../ui';

import * as css from './main.module.css';

interface IProps {
  mountpoint: React.RefObject<HTMLDivElement>;
  delete: () => void;
}

interface IState {
  opened: boolean;
}

class Remove extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      opened: false,
    };

    this.renderPopover = this.renderPopover.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    const { opened } = this.state;

    this.setState({ opened: !opened });
  }

  renderPopover() {
    const { opened } = this.state;
    const { mountpoint } = this.props;

    return opened && (
      <Popover
        opened={opened}
        mountpoint={mountpoint}
        closeHandler={this.togglePopover}
      >
        <div className={css.overlay}>
          <Typography className={css.title} tag="h3" weight="light" color="black_2">
            Remove this task
          </Typography>
          <Typography className={css.subtitle} tag="p" color="black_2" weight="light">
            Are you sure, that you want to remote this task?
          </Typography>
          <Typography className={css.subtitle} tag="p" color="black_2" weight="light">
            After removing, you would be able to restore it from archive in history page.
          </Typography>
          <div className={css.controls}>
            <Button color="ash" onClick={this.togglePopover}>Cancel</Button>
            <Typography className={css.or_text} tag="span" color="ash">or</Typography>
            <Button color="sky" onClick={this.props.delete}>Delete</Button>
          </div>
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <>
        <Button
          color="black_2"
          size="small"
          fill="blank"
          onClick={this.togglePopover}
        >
          Delete
        </Button>
        {this.renderPopover()}
      </>
    );
  }
}

export default Remove;
