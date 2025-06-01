//Job Seeker actions
export const GET_JOB_LIST = 'GET_JOB_LIST'
export const APPLY_JOB = 'APPLY_JOB'
export const SAVE_JOB = 'SAVE_JOB'
export const WITHDRAW_JOB = 'WITHDRAW_JOB'


export const getJobList = (input) => {
    return {
        payload: input,
        type: GET_JOB_LIST
    }
}

export const applyJob = (input) => {
    return {
        payload: input,
        type: APPLY_JOB
    }
}

export const saveJob = (input) => {
    return {
        payload: input,
        type: SAVE_JOB
    }
}


export const withdrawJob = (input) => {
    return {
        payload: input,
        type: WITHDRAW_JOB
    }
}