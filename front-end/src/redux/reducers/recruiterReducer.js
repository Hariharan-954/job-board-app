import { POST_JOB, UPDATE_JOB, DELETE_JOB } from "../actions/recruiterActions";

const initialState = {
    postedJobs: [],
};

const recruiterReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_JOB: {
            return {
                ...state,
                postedJobs: action.payload
            }
        }
        case UPDATE_JOB: {
            return {
                ...state,
                postedJobs: state.postedJobs.map((job) => {
                    if (action.payload._id === job._id) {
                        return { ...job, ...action.payload }
                    }
                    return job
                })
            }
        }

        case DELETE_JOB: {
            return {
                ...state,
                postedJobs: state.postedJobs.filter((job) => job._id !== action.payload._id)
            }
        }

        default:
            return state;
    }
};

export default recruiterReducer;
