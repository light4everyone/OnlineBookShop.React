import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import CombinedStore from "../CombinedStore";

export type AsyncAction = ThunkAction<
  void | Promise<void>,
  CombinedStore,
  void,
  AnyAction
>;