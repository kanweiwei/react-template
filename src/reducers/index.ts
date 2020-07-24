import { combineReducers } from "redux";
import rootStore from "./rootStore";

export type RootState = {
  [propName: string]: unknown;
};

export default combineReducers({
  rootStore,
});
