import { DeleteHackaton, GetHackatons, PostHackaton, PutHackaton } from "../API/API";
import { ActionType } from "../Constants/ActionType";

export const getHackatons = () => async(dispach) => {
    dispach({
        type: ActionType.GET_HACKATONS,
        payload: await GetHackatons()
    })
}

export const postHackaton = (data) => async(dispach) => {
    dispach({
        type: ActionType.POST_HACKATON,
        payload: await PostHackaton(data)
    })
}

export const putHackaton = (id, data) => async(dispach) => {
    dispach({
        type: ActionType.PUT_HACKATON,
        payload: await PutHackaton(id,data)
    })
}

export const deleteHackaton = (id) => async(dispach) => {
    dispach({
        type: ActionType.DELETE_HACKATON,
        payload: await DeleteHackaton(id)
    })
}