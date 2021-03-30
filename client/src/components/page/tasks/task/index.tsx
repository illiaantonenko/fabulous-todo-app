import * as React from 'react';

import { Button, Typography } from '../../../ui';
import { ITask } from '../../../../core/system/tasks/types';
import Remove from '../remove';
import Edit from '../edit';

import * as css from './main.module.css';

interface IProps extends ITask {
  mountpoint: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  delete: () => void;
  edit: (params: any) => void;
}

const Task : React.FC<IProps> = (props) => (
  <div className={css.wrapper}>
    <div className={css.complete}>
      <Edit
        initValue={{
          title: props.title,
          description: props.description,
          id: props.id,
        }}
        mountpoint={props.mountpoint}
        onSubmit={props.edit}
      />
    </div>
    <div className={css.text}>
      <Typography tag="h4" weight="regular" color="black_2" className={css.title}>
        {props.title}
      </Typography>
      <Typography tag="p" color="ash" weight="light">
        {props.description}
      </Typography>
    </div>
    <div className={css.controls}>
      <Remove
        mountpoint={props.mountpoint}
        delete={props.delete}
      />
      <Typography tag="span" color="ash" weight="light" className={css.or_text}>or</Typography>
      <Button
        color="sky"
        size="small"
        fill="bordered"
        onClick={props.toggle}
      >
        {props.status.completed ? 'Undo' : 'Complete'}
      </Button>
    </div>
  </div>
);

export default Task;
