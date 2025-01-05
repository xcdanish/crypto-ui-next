// third-party
import { combineReducers } from "redux";
// project imports
import counterSlice from "./slices/counterSlice";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  counter: counterSlice,
});

export default reducer;
