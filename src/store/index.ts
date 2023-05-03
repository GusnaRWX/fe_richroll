import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store:Store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
