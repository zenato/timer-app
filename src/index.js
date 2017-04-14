import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import I18n from 'react-native-i18n';
import reducers from './state/reducers';
import Timer from './containers/Timer';
import translations from './i18n';

I18n.fallbacks = true;
I18n.translations = translations;

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const App = () => (
  <Provider store={store}>
    <Timer />
  </Provider>
);

export default App;
