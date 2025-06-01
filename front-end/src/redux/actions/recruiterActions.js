//Recruiter actions
export const POST_JOB = 'POST_JOB'
export const UPDATE_JOB = 'UPDATE_JOB'
export const DELETE_JOB = 'DELETE_JOB'


export const postJob = (input) => {
    return {
        payload: input,
        type: POST_JOB
    }
}

export const updateJob = (input) => {
    return {
        payload: input,
        type: UPDATE_JOB
    }
}

export const deleteJob = (input) => {
    return {
        payload: input,
        type: DELETE_JOB
    }
}