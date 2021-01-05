import { DeleteUser, GetUsers, PostUser, PutUser } from "../API/API";
import {ActionType } from "../Constants/ActionType";

export const getUsers = () => async(dispach) => {
    dispach({
        type: ActionType.GET_USERS,
        payload: await GetUsers()
    })
}

export const postUser = (data) => async(dispach) => {
    dispach({
        type: ActionType.POST_USER,
        payload: await PostUser(data)
    })
}

export const putUser = (id,data) => async(dispach) => {
    dispach({
        type: ActionType.PUT_USER,
        payload: await PutUser(id,data)
    })
}

export const deleteUser = (id) => async(dispach) => {
    dispach({
        type: ActionType.DELETE_USER,
        payload: await DeleteUser(id)
    })
}