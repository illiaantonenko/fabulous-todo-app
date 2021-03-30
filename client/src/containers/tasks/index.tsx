import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';

import * as USER from '../../core/system/user';
import * as TASKS from '../../core/system/tasks';
import { IAppState } from '../../core/store';
import TasksPage from '../../components/page/tasks';

interface IStateProps {
  username: USER.TYPES.IUser['username'];
  email: USER.TYPES.IUser['email'];
  tasks: TASKS.TYPES.ITasks;
}

interface IDispatchProps {
  getTasks: () => void;
  putTask: (payload: TASKS.TYPES.ITaskBody) => void;
  deleteTask: (payload: TASKS.TYPES.IDeleteTask) => void;
  toggleTask: (payload: TASKS.TYPES.IToggleTask) => void;
  editTask: (payload: TASKS.TYPES.ITask) => void;
}

export type Props = IStateProps & IDispatchProps & RouteProps;

const mapStateToProps = (state: IAppState, ownProp: RouteProps) : IStateProps => ({
  username: state.user.username,
  email: state.user.email,
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteProps) : IDispatchProps => ({
  getTasks: () => {
    dispatch(TASKS.ACTIONS.tasksGetRequest());
  },
  putTask: (payload) => {
    dispatch(TASKS.ACTIONS.taskPutRequest(payload));
  },
  deleteTask: (payload) => {
    dispatch(TASKS.ACTIONS.taskDeleteRequest(payload));
  },
  toggleTask: (payload) => {
    dispatch(TASKS.ACTIONS.taskToggleRequest(payload));
  },
  editTask: (payload) => {
    dispatch(TASKS.ACTIONS.taskEditRequest(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksPage);
