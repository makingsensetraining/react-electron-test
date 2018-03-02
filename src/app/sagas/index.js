import { call, put, takeEvery } from 'redux-saga/effects';
import UniversalActions from '../actions/universalActions';
import { apiClient, uploadFile } from '../api/client';
import PubNub from '../api/pubnub';
import loginSaga from './login';

const PubNubClient = new PubNub();

function* requestModule(action) {
  try {
    const params = Object.assign({}, {
      query: action.query,
      module: 'about',
      method: 'get',
      token: localStorage.getItem('@token') || '',
      data: action.data,
    }, action);
    const response = yield call(apiClient, params);
    yield put({ type: 'TOGGLE_PROP', key: 'openNotification' });
    if (params.method === 'get') yield put(UniversalActions.fetchSuccess(params.module, Object.assign({}, params, response)));
    if (params.method === 'patch') yield put(UniversalActions.updateSuccess(params.module, Object.assign({}, params, response)));
  } catch (e) {
    yield put(UniversalActions.requestError({
      payload: Object.assign({}, action.payload, { error: e }),
    }));
  }
}

function* uploadImage(action) {
  try {
    const { form, folder, file } = action.data;
    const newfile = yield uploadFile(form, file, folder);
    yield put({ type: 'UNIVERSAL_UPLOAD_FILE_SUCCESS', newfile });
    yield put({ type: 'TOGGLE_PROP', key: 'openNotification' });
    action.data.cb(newfile);
  } catch (e) {
    console.info('Error en requestModule: ', e);
    yield put(UniversalActions.requestError({
      payload: Object.assign({}, action.payload, { error: e }),
    }));
  }
}

function* chatCreateChannel(action) {
  try {
    const { name, cbMessage } = action;

    PubNubClient.createChannel(name, cbMessage);
    yield put({ type: 'CHAT_CREATED_CHANNEL', channel: name });
  } catch (e) {
    yield put({ type: 'CHAT_ERROR_CREATE_CHANNEL', error: e.toString() });
  }
}

function* chatSendMessage(action) {
  try {
    const { channel, message } = action;
    PubNubClient.publish(channel, message);
    yield put({ type: 'CHAT_SENT_MESSAGE', channel, message });
  } catch (e) {
    yield put({ type: 'CHAT_ERROR_SEND_MESSAGE', error: e.toString() });
  }
}


function* universalSaga() {
  yield takeEvery('UNIVERSAL_REMOVE_MODULE', requestModule);
  yield takeEvery('UNIVERSAL_UPDATE_MODULE', requestModule);
  yield takeEvery('UNIVERSAL_INSERT_MODULE', requestModule);
  yield takeEvery('UNIVERSAL_FETCH_MODULE', requestModule);
  yield takeEvery('UNIVERSAL_UPLOAD_FILE', uploadImage);
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('CHAT_CREATE_CHANNEL', chatCreateChannel);
  yield takeEvery('CHAT_SEND_MESSAGE', chatSendMessage);
}

export default universalSaga;
