import { combineReducers } from "redux";
import jobSeekerReducer from "./jobSeekerReducer";
import recruiterReducer from "./recruiterReducer";

const rootReducer = combineReducers({
    jobSeeker: jobSeekerReducer,
    recruiter: recruiterReducer,
});
export default rootReducer;
