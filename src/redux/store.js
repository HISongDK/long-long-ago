import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

// 引入插件支持
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
