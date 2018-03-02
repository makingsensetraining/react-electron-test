import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import { Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import GenerateMenu from './components/Menu';
import reducers from './reducers';
import mySaga from './sagas';

import Home from './containers/Home';


const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(routerMiddleware(history), sagaMiddleware, logger),
);

sagaMiddleware.run(mySaga);

const Empty = () => (<div>Empty</div>);
const HomeScreen = () => (<GenerateMenu component={<Home />} />);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container-fluid">
        <Route exact path="/" component={HomeScreen} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
