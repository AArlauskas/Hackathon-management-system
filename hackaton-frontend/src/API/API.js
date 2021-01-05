import axios from "axios";
let baseUri = "https://localhost:44318/api";

let Api = axios.create({
    baseURL: baseUri,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.localStorage.getItem("token")
    }
});

export const GetCredentials = async () => {
    return await Api.get("/Users/get-credentials/")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const UpdateCredentials = async (data) => {
    return await Api.put("/Users/update-credentials/", data)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetHackatons = async () => {
    return await Api.get("/Hackatons/")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PostHackaton = async (data) => {
    return await Api.post("/Hackatons/", data)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PutHackaton = async (id, data) => {
    return await Api.put("/Hackatons/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const DeleteHackaton = async (id) => {
    return await Api.put("/Hackatons/delete/" + id)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetUsers = async () => {
    return await Api.get("/Users/")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PostUser = async (data) => {
    return await Api.post("/Users/", data)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PutUser = async (id, data) => {
    return await Api.put("/Users/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const DeleteUser = async (id) => {
    return await Api.put("/Users/delete/" + id)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetTeams = async () => {
    return await Api.get("/Teams/")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PostTeam = async (data) => {
    return await Api.post("/Teams/", data)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const PutTeam = async (id, data) => {
    return await Api.put("/Teams/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const DeleteTeam = async (id) => {
    return await Api.put("/Teams/delete/" + id)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetHackatonTeams = async (id) => {
    return await Api.get("/Hackatons/Teams/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetUntakenTeamsList = async (id) => {
    return await Api.get("/Teams/untaken-list/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const AddTeamsToHackaton = async (id, data) => {
    return await Api.put("/Hackatons/add-team/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const RemoveTeamsFromHackaton = async (id, data) => {
    return await Api.put("/Hackatons/remove-team/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetTeamUsers = async (id) => {
    return await Api.get("/Teams/Users/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetUntakenUsersList = async (id) => {
    return await Api.get("/Users/untaken-list/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const AddUsersToTeam = async (id, data) => {
    return await Api.put("/Teams/add-user/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const RemoveUsersFromTeam = async (id, data) => {
    return await Api.put("/Teams/remove-user/" + id, data)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetHackatonTeamsUser = async () => {
    return await Api.get("/Hackatons/Teams/User")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetProjectOverlook = async () => {
    return await Api.get("/Teams/overlook")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetProjectText = async () => {
    return await Api.get("/Teams/Text")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const SetProjectText = async (Text) => {
    return await Api.put("/Teams/Text/", Text)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetProjectFileList = async () => {
    return await Api.get("/Teams/file-list")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetTeamDetails = async () => {
    return await Api.get("/Teams/team-details")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const SetTeamDetails = async (name, title) => {
    return await Api.put("/Teams/team-details/",{
        name: name,
        title: title
    })
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetTeamDetailsAdmin = async (id) => {
    return await Api.get("/Teams/admin/team-details/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetProjectTextAdmin = async (id) => {
    return await Api.get("/Teams/admin/Text/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};

export const GetProjectFileListAdmin = async (id) => {
    return await Api.get("/Teams/admin/file-list/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.localStorage.clear();
            window.location.reload(false);
        })
};