import { Action } from 'redux';
import { takeLatest, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import jwt from 'jwt-decode';

import { TYPES, ACTIONS } from '../../system/user';
import { Auth } from '../../../utils/api';

function* authSaga(action: TYPES.IAuthUserAction) {
  try {
    const data = yield Auth.signInRequest.json({ body: JSON.stringify(action.payload) });

    if (!data.ok) throw data;

    const user : any = jwt(data.body.token);

    const payload : TYPES.IUser = {
      token: data.body.token,
      created_at: user.created_at,
      username: user.username,
      email: user.email,
      id: user._id,
    };

    localStorage.setItem('token', payload.token);
    yield put(ACTIONS.setUser(payload));
  } catch (err) {
    console.error(err);
  }
}

function* registerSaga(action: TYPES.IRegUserAction) {
  try {
    const data = yield Auth.signUpRequest.json({
      body: JSON.stringify(action.payload),
    });

    if (!data.ok) throw data;

    const user : any = jwt(data.body.token);
    const payload : TYPES.IUser = {
      token: data.body.token,
      created_at: user.created_at,
      username: user.username,
      email: user.email,
      id: user._id,
    };

    localStorage.setItem('token', payload.token);
    yield put(ACTIONS.setUser(payload));
  } catch (err) {
    console.error(err);
  }
}

function* logoutSaga(action: Action) {
  try {
    const data = yield action;

    console.log('LO saga');
  } catch (err) {
    console.error(err);
  }
}

export default function* userSaga() : SagaIterator {
  yield takeLatest(TYPES.USER_REG_REQUEST, registerSaga);
  yield takeLatest(TYPES.USER_AUTH_REQUEST, authSaga);
  yield takeLatest(TYPES.LOGOUT, logoutSaga);
}
