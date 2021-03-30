import * as React from 'react';

import {
  Icon,
  Popover,
  Tooltip,
  Typography,
} from '../../../ui';
import { IEditTask } from '../../../../core/system/tasks/types';

import Form from './form';
import * as css from './main.module.css';

interface IProps {
  initValue: IEditTask;
  className?: string | undefined;
  mountpoint: React.RefObject<HTMLDivElement>;
  toggle?: () => void;
  onSubmit: (params: any) => void;
}

interface IState {
  opened: boolean;
}

class EditTask extends React.Component<IProps, IState> {
  target : any;

  constructor(props : IProps) {
    super(props);

    this.state = {
      opened: false,
    };

    this.target = React.createRef();

    this.togglePopover = this.togglePopover.bind(this);
    this.renderPopover = this.renderPopover.bind(this);
  }

  togglePopover() {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  }

  renderPopover() {
    const { opened } = this.state;
    const { mountpoint } = this.props;

    if (!opened) return null;

    return (
      <Popover
        mountpoint={mountpoint}
        opened={opened}
        closeHandler={this.togglePopover}
      >
        <div className={css.overlay}>
          <Typography tag="h3" weight="light" color="black_2" className={css.popover_title}>
            Edit task
          </Typography>
          <Form
            initValue={this.props.initValue}
            onSubmit={this.props.onSubmit}
            callback={this.togglePopover}
          />
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <>
        <button
          type="button"
          className={`${this.props.className} ${css.complete_button}`}
          onClick={this.togglePopover}
          ref={this.target}
        >
          <Icon
            className={css.edit_icon}
            type="EditSquare"
            color="ash"
            width={1}
          />
          <Tooltip
            position="right"
            trigger="hover"
            target={this.target.current}
            text="Add new task"
          />
        </button>
        {this.renderPopover()}
      </>
    );
  }
}

export default EditTask;
