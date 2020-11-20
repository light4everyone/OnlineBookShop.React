import { AuthStore } from "./reducers/auth";

export default interface CombinedStore {
  auth: AuthStore;
}