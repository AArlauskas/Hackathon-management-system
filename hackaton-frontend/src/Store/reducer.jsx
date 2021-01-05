import {ActionType} from "../Constants/ActionType";

const initialState = {
    Hackatons: null,
    Users: null,
    Teams: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case ActionType.GET_HACKATONS: {
            return {
                ...state,
                Hackatons: action.payload
            }
        }

        case ActionType.POST_HACKATON: {
            return {
                ...state,
                Hackatons: [...state.Hackatons, action.payload]
            }
        }

        case ActionType.PUT_HACKATON: {
            let updatedHackaton = action.payload;
            let index = state.Hackatons.indexOf(state.Hackatons.find(hackaton => hackaton.Id === updatedHackaton.Id));
            let tempHackatons = [...state.Hackatons];
            tempHackatons[index] = updatedHackaton;
            return {
                ...state,
                Hackatons: [...tempHackatons]
            }
        }

        case ActionType.DELETE_HACKATON: {
            let id = action.payload;
            return {
                ...state,
                Hackatons: state.Hackatons.filter(temp => temp.Id !== id)
            }
        }

        case ActionType.GET_USERS: {
            return {
                ...state,
                Users: action.payload
            }
        }

        case ActionType.POST_USER: {
            return {
                ...state,
                Users: [...state.Users, action.payload]
            }
        }

        case ActionType.PUT_USER: {
            let updatedUser = action.payload;
            let index = state.Users.indexOf(state.Users.find(user => user.Id === updatedUser.Id));
            let tempUsers = [...state.Users];
            tempUsers[index] = updatedUser;
            return {
                ...state,
                Users: [...tempUsers]
            }
        }

        case ActionType.DELETE_USER: {
            let id = action.payload;
            return {
                ...state,
                Users: state.Users.filter(temp => temp.Id !== id)
            }
        }

        case ActionType.GET_TEAMS: {
            return {
                ...state,
                Teams: action.payload
            }
        }

        case ActionType.POST_TEAM: {
            return {
                ...state,
                Teams: [...state.Teams, action.payload]
            }
        }

        case ActionType.PUT_TEAM: {
            let updatedTeam = action.payload;
            let index = state.Teams.indexOf(state.Teams.find(team => team.Id === updatedTeam.Id));
            let tempTeams = [...state.Teams];
            tempTeams[index] = updatedTeam;
            return {
                ...state,
                Teams: [...tempTeams]
            }
        }

        case ActionType.DELETE_TEAM: {
            let id = action.payload;
            return {
                ...state,
                Teams: state.Teams.filter(temp => temp.Id !== id)
            }
        }


        default: {
            return {
                ...state
            }
        }
    }
}