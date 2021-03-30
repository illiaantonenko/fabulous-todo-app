import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put } from 'redux-saga/effects';

import { Tasks } from '../../../utils/api';
import { TYPES, ACTIONS } from '../../system/tasks';

const API = Tasks;

function* getToken() : SagaIterator {
  const store = yield select();

  return store.user.token as string;
}

function* tasksGet() {
  const token = yield getToken();

  try {
    const response = yield API.tasksGetRequest.json({
      token,
    });

    if (!response.ok) throw new Error(`Response is not ok... Status is ${response.status}`);

    yield put(ACTIONS.tasksGetSuccess(response.body.tasks));
  } catch (error) {
    console.error(error);
  }
}

function* taskPut(action: TYPES.ITaskAction<TYPES.ITaskBody>) {
  const token = yield getToken();

  try {
    const response = yield API.tasksPutRequest.json({
      token,
      body: JSON.stringify(action.payload),
    });

    if (!response.ok) throw new Error(`Response is not ok... Status is ${response.status}`);

    yield put(ACTIONS.taskPutSuccess(response.body.task));
  } catch (error) {
    console.error(error);
  }

  console.log(action.type, ' = called with token: ', token);
  yield null;
}

function* taskDelete(action: TYPES.ITaskAction<TYPES.IDeleteTask>) {
  const token = yield getToken();

  try {
    const response = yield API.taskDeleteRequest.json({
      token,
      query: {
        id: action.payload.id,
      },
    });

    if (!response.ok) throw new Error(`Response is not ok... Status is ${response.status}`);

    yield put(ACTIONS.taskDeleteSuccess(response.body.task));
  } catch (err) {
    console.error(err);
  }
}

function* taskToggle(action: TYPES.ITaskAction<TYPES.IToggleTask>) {
  const token = yield getToken();

  const { id, completed } = action.payload;

  try {
    const response = yield API.taskPostRequest.json({
      token,
      query: {
        id,
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) throw new Error(`Response is not ok... Status is ${response.status}`);

    yield put(ACTIONS.taskToggleSuccess({ id, completed }));
  } catch (err) {
    console.error(err);
  }
}

function* taskPost(action: TYPES.ITaskAction<TYPES.IEditTask>) {
  const token = yield getToken();

  const { id, title, description } = action.payload;

  try {
    const response = yield API.taskPostRequest.json({
      token,
      query: {
        id,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) throw new Error(`Response is not ok... Status is ${response.status}`);

    yield put(ACTIONS.taskEditSuccess({ ...response.body }));
  } catch (err) {
    yield console.error(err);
  }
}

export default function* tasksSaga() : SagaIterator {
  yield takeLatest(TYPES.TASK_GET_REQUEST, tasksGet);
  yield takeLatest(TYPES.TASK_PUT_REQUEST, taskPut);
  yield takeLatest(TYPES.TASK_DELETE_REQUEST, taskDelete);
  yield takeLatest(TYPES.TASK_TOGGLE_REQUEST, taskToggle);
  yield takeLatest(TYPES.TASK_EDIT_REQUEST, taskPost);
}
