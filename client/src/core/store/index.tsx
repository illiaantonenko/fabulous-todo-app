import {
  Reducer, combineReducers, createStore, applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as USER from '../system/user';
import * as TASKS from '../system/tasks';
import rootSaga from '../sagas';

export interface IAppState {
  user: USER.TYPES.IUser;
  tasks: TASKS.TYPES.ITasks;
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  user: USER.REDUCERS,
  tasks: TASKS.REDUCERS,
});

const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};

const saga = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, saga),
);

(window as any).store = store;

saga.run(rootSaga);
