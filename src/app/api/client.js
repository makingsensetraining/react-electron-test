import axios from 'axios';
import config from './config';

const BASE_URL = config.ENDPOINT_URL;

const headers = (token) => {
  if (token) axios.defaults.headers.common['x-access-token'] = token;
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.apikey = config.API_KEY;
};


export const apiClient = (params) => {
  headers(params.token || '');
  if (params.headers) {
    Object.keys(params.headers).forEach(k => (axios.defaults.headers.common[k] = params.headers[k]));
  }
  const localParams = Object.assign({}, params.query || {});
  const options = {
    method: params.method.toLowerCase(),
    url: params.module,
    baseURL: BASE_URL,
    params: localParams,
    data: params.data,
  };

  return axios.request(options)
    .then(res => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const uploadFile = (form, file, folder) => {
  return new Promise((resolve, reject) => {
    const oData = new FormData(form);

    oData.append('folder', folder);
    oData.append('upfile', file);

    const oReq = new XMLHttpRequest();
    // CC: modify for the real upload path
    oReq.open('POST', 'http://localhost:4500/service/upload', true);
    oReq.onload = (oEvent) => {
      if (oReq.status === 200) {
        return resolve(JSON.parse(oReq.response));
      }
      return reject(new Error(`Error ${oReq.status}`));
    };
    oReq.setRequestHeader('apikey', 'xxxxxxxxx');
    oReq.send(oData);
  });
};
