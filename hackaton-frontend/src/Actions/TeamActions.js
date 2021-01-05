import { DeleteTeam, GetTeams, PostTeam, PutTeam } from "../API/API";
import {ActionType} from "../Constants/ActionType";

export const getTeams = () => async(dispach) => {
    dispach({
        type: ActionType.GET_TEAMS,
        payload: await GetTeams()
    })
}

export const postTeam = (data) => async(dispach) => {
    dispach({
        type: ActionType.POST_TEAM,
        payload: await PostTeam(data)
    })
}

export const putTeam = (id, data) => async(dispach) => {
    dispach({
        type: ActionType.PUT_TEAM,
        payload: await PutTeam(id,data)
    })
}

export const deleteTeam = (id) => async(dispach) => {
    dispach({
        type: ActionType.DELETE_TEAM,
        payload: await DeleteTeam(id)
    })
}