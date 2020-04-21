/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/21 09:43
 */
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage
};

const myPersistReducer = persistReducer(persistConfig, reducer);
// 处理后的 reducers 需要作为参数传递在 createStore 中
export const store = createStore(myPersistReducer);
// 持久化 store
export const persistor = persistStore(store);
