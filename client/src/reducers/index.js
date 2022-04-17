import emailReducer from "./email";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    email: emailReducer
});

export default allReducers;