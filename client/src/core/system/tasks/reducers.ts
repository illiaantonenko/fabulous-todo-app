import * as TYPES from './types';

const initialState : TYPES.ITasks = {
  tasks: [],
  isFetching: false,
};

const tasks = (
  state: TYPES.ITasks = initialState,
  action: TYPES.TaskActionTypes,
) : TYPES.ITasks => {
  switch (action.type) {
    case TYPES.TASK_GET_REQUEST:
    case TYPES.TASK_TOGGLE_REQUEST:
    case TYPES.TASK_EDIT_REQUEST:
    case TYPES.TASK_PUT_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    } case TYPES.TASK_GET_SUCCESS: {
      const { payload } = action as TYPES.ITaskAction<TYPES.ITask[]>;

      return {
        ...state,
        tasks: payload,
        isFetching: false,
      };
    } case TYPES.TASK_PUT_SUCCESS: {
      const { payload } = action as TYPES.ITaskAction<TYPES.ITask>;

      return {
        ...state,
        tasks: [...state.tasks, payload],
        isFetching: false,
      };
    } case TYPES.TASK_EDIT_SUCCESS: {
      const { payload } = action as TYPES.ITaskAction<TYPES.ITask>;
      let newTasks = state.tasks.slice();

      newTasks = newTasks.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }

        return item;
      });

      return {
        ...state,
        tasks: [...newTasks],
        isFetching: false,
      };
    } case TYPES.TASK_DELETE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    } case TYPES.TASK_DELETE_SUCCESS: {
      const { payload } = action as TYPES.ITaskAction<TYPES.IDeleteTask>;

      return {
        ...state,
        tasks: state.tasks.filter((item) => (item.id !== payload.id)),
        isFetching: false,
      };
    } case TYPES.TASK_TOGGLE_SUCCESS: {
      const { payload } = action as TYPES.ITaskAction<TYPES.IToggleTask>;
      const tasks = state.tasks.slice();

      tasks.forEach((item) => {
        if (item.id === payload.id) item.status.completed = payload.completed;
      });

      return {
        ...state,
        tasks,
        isFetching: false,
      };
    }
    default: return state;
  }
};

export default tasks;
