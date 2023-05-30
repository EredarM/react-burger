import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

import {rootReducer} from "../services/reducers";


const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type AppSelector = ReturnType<typeof rootReducer>;
export default store;