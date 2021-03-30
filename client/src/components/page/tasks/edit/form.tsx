import * as React from 'react';

import {
  Field,
  Button,
  Typography,
} from '../../../ui';
import { IEditTask } from '../../../../core/system/tasks/types';

import * as css from './main.module.css';

interface IProps {
  initValue: IEditTask;
  onSubmit: (prop: any) => any;
  callback?: () => any;
}

class AddForm extends React.Component<IProps> {
  inputs: Record<string, React.RefObject<Field>>;

  name: string;

  constructor(props: IProps) {
    super(props);

    this.inputs = {
      title: React.createRef(),
      description: React.createRef(),
      id: React.createRef(),
    };

    this.name = 'task_add';

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e : React.FormEvent) {
    e.preventDefault();

    const payload : Record<string, any> = {};
    let valid = true;

    Object.keys(this.inputs).forEach((input) => {
      const target = this.inputs[input].current;

      if (!target || !target.state.valid) {
        console.log(target);
        valid = false;
      }
      target && (
        payload[input] = target.state.value
      );
    });

    if (valid) {
      this.props.onSubmit(payload);
      if (this.props.callback) this.props.callback();
    } else console.log('not submit');
  }

  render() {
    return (
      <form id={this.name} className={css.form} onSubmit={this.onSubmit}>
        <Field
          type="hidden"
          required
          name="id"
          ref={this.inputs.id}
          value={this.props.initValue.id}
        />
        <Field
          type="text"
          required
          name="title"
          label="Title"
          ref={this.inputs.title}
          value={this.props.initValue.title}
        />
        <Field
          type="text"
          required
          name="description"
          label="Description"
          ref={this.inputs.description}
          value={this.props.initValue.description}
        />
        <div className={css.control_block}>
          <Button color="ash" type="button" onClick={this.props.callback}>Cancel</Button>
          <Typography tag="span" color="ash" weight="light" className={css.or_text}>or</Typography>
          <Button color="sky" type="submit">Update</Button>
        </div>
      </form>
    );
  }
}

export default AddForm;
