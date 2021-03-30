import { Action } from 'redux';

import * as TYPES from './types';

// Tasks getters
export const tasksGetRequest = () : Action<string> => ({
  type: TYPES.TASK_GET_REQUEST,
});

export const tasksGetSuccess = (payload: TYPES.ITask[]) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_GET_SUCCESS,
});

// Put request actions
export const taskPutRequest = (payload: TYPES.ITaskBody) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_PUT_REQUEST,
});

export const taskPutSuccess = (payload: TYPES.ITask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_PUT_SUCCESS,
});

// Delete request actions
export const taskDeleteRequest = (payload: TYPES.IDeleteTask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_DELETE_REQUEST,
});

export const taskDeleteSuccess = (payload: TYPES.IDeleteTask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_DELETE_SUCCESS,
});

// Get edit request action
export const taskToggleRequest = (payload: TYPES.IToggleTask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_TOGGLE_REQUEST,
});

export const taskToggleSuccess = (payload: TYPES.IToggleTask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_TOGGLE_SUCCESS,
});

// Post request actions
export const taskEditRequest = (payload: TYPES.IEditTask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_EDIT_REQUEST,
});

export const taskEditSuccess = (payload: TYPES.ITask) : TYPES.TaskActionTypes => ({
  payload,
  type: TYPES.TASK_EDIT_SUCCESS,
});
