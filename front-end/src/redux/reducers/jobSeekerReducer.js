import { GET_JOB_LIST, APPLY_JOB, SAVE_JOB, WITHDRAW_JOB } from "../actions/jobSeekerActions";

const initialState = {
    jobList: [],
    appliedJobs: [],
    savedJobs: [],
};

const jobSeekerReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_JOB_LIST: {
            return {
                ...state,
                jobList: action.payload
            }
        }

        case APPLY_JOB: {
            return {
                ...state,
                jobList: state.jobList.map((job) => {
                    if (action.payload._id === job._id) {
                        return {
                            ...job,
                            isApplied: action.payload.isApplied
                        }
                    }
                    return job
                }),
            }
        }
        case SAVE_JOB: {
            return {
                ...state,
                jobList: state.jobList.map((job) => {
                    if (action.payload._id === job._id) {
                        return {
                            ...job,
                            isSaved: action.payload.isSaved
                        }
                    }
                    return job
                }),
            }
        }
        case WITHDRAW_JOB: {
            return {
                ...state,
                jobList: state.jobList.map((job) => {
                    if (action.payload._id === job._id) {
                        return {
                            ...job,
                            isApplied: action.payload.isApplied
                        }
                    }
                    return job
                }),
            }
        }
        default:
            return state;
    }
};

export default jobSeekerReducer;
