import config from '../api/config';

const loadConfig = () => ({
  type: 'UNIVERSAL_LOAD_CONFIG_MODULE',
  host: config.ENDPOINT_URL,
  module: null,
  payload: {
    file: '/api-docs',
  },
});

const fetch = (module, payload) => ({
  type: 'UNIVERSAL_FETCH_MODULE',
  host: config.ENDPOINT_URL,
  module,
  method: 'get',
  query: payload.query,
  data: payload.data,
});

const fetchSuccess = (module, payload) => ({
  type: 'FETCH_MODULE_SUCCESS',
  module,
  payload,
});

const requestError = (module, payload) => ({
  type: 'FETCH_MODULE_ERROR',
  module: payload.module,
  payload,
});

const remove = (module, payload) => ({
  type: 'UNIVERSAL_REMOVE_MODULE',
  host: config.ENDPOINT_URL,
  module,
  method: 'delete',
  payload,
});

const update = (module, payload) => ({
  type: 'UNIVERSAL_UPDATE_MODULE',
  host: config.ENDPOINT_URL,
  module,
  method: 'patch',
  data: payload.data,
});

const updateSuccess = payload => ({
  type: 'UPDATE_MODULE_SUCCESS',
  host: config.ENDPOINT_URL,
  module: payload.module,
  data: payload.data,
});

const insert = (module, payload) => ({
  type: 'UNIVERSAL_INSERT_MODULE',
  host: config.ENDPOINT_URL,
  method: 'put',
  module,
  data: payload.data,
});

const upload = data => ({
  type: 'UNIVERSAL_UPLOAD_FILE',
  data,
});

const toggleProp = key => ({
  type: 'TOGGLE_PROP',
  key,
});

const addToTemporal = (storage, item) => ({
  type: 'ADD_TO_TEMPORAL_STORAGE',
  item,
  storage,
});


const removeToTemporal = (storage, item, key) => ({
  type: 'REMOVE_TO_TEMPORAL_STORAGE',
  storage,
  item,
  key,
});


const setState = (state, value) => ({
  type: 'SET_TEMPORAL_STATE',
  state,
  value,
});


export default {
  loadConfig,
  fetch,
  fetchSuccess,
  requestError,
  remove,
  update,
  insert,
  toggleProp,
  addToTemporal,
  updateSuccess,
  removeToTemporal,
  setState,
  upload,
};
