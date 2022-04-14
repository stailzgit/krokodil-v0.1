import { RootState } from "../store/store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("crocodiller-state");
    if (serializedState === null) {
      return undefined;
    }
    const res = JSON.parse(serializedState);
    return res;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("crocodiller-state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem("crocodiller-state");
  } catch (e) {
    console.log(e);
  }
};
