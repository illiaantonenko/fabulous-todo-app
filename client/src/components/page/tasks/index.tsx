import * as React from 'react';

import { Props } from '../../../containers/tasks';
import { Typography } from '../../ui';

import Sidebar from './sidebar';
import Header from './header';
import Add from './add';
import Task from './task';
import * as css from './main.module.css';

class TasksPage extends React.Component<Props> {
  mountpoint : React.RefObject<HTMLDivElement>;

  constructor(props : Props) {
    super(props);

    this.mountpoint = React.createRef();
  }

  componentDidMount() {
    const { tasks, getTasks } = this.props;

    if (!tasks.tasks.length) {
      getTasks();
    }
  }

  removeTast() {
  }

  mapTasks() {
    const { tasks: { tasks } } = this.props;

    return tasks.map((task) => (
      !task.status.deleted && (
      <Task
        mountpoint={this.mountpoint}
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
        delete={this.props.deleteTask.bind(this, { id: task.id })}
        toggle={this.props.toggleTask.bind(
          this,
          { id: task.id, completed: !task.status.completed },
        )}
        edit={this.props.editTask}
      />
      )
    ));
  }

  render() {
    const {
      username,
      email,
    } = this.props;

    return (
      <div className={css.layout}>
        <div className={css.content}>
          <Header mountpoint={this.mountpoint}>
            <div className={css.controls}>
              <Add
                mountpoint={this.mountpoint}
                className={css.control_item}
                onSubmit={this.props.putTask}
              />
              {/* Here should be search later */}
            </div>
          </Header>
          <div className={css.body} ref={this.mountpoint}>
            <div className={css.content_wrapper}>
              <Typography tag="h3" color="black_2" weight="light" className={css.page_title}>
                Task list
              </Typography>
              <div className={css.tasks_wrapper}>
                {this.mapTasks()}
              </div>
            </div>
          </div>
        </div>
        <Sidebar
          username={username}
          email={email}
        />
      </div>
    );
  }
}

export default TasksPage;
