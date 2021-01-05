import axios from "axios";
let baseUri = "https://localhost:44318/api";

let Api = axios.create({
    baseURL: baseUri,
    headers: {
        "Content-Type": "application/json"
    }
});

export const GetPublicHackatons = async () => {
    return await Api.get("/Hackatons/public/")
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.location.href = "/";
        })
};

export const GetPublicHackathonTeams = async (id) => {
    return await Api.get("/Hackatons/public/Teams/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.location.href = "/";
        })
};

export const GetPublicProjectText = async (id) => {
    return await Api.get("/Teams/public/Text/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.location.href = "/";
        })
};


export const GetPublicProjectFileList = async (id) => {
    return await Api.get("/Teams/public/file-list/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.location.href = "/";
        })
};

export const GetPublicTeamDetails = async (id) => {
    return await Api.get("/Teams/public/team-details/" + id)
        .then((response) => {
            return response.data;
        }).catch(error => {
            window.location.href = "/";
        })
};

export const RegisterUser = async (data) => {
    return await Api.post("/Users/Register",data)
        .then((response) => {
            return response;
}).catch(error => {
    console.log("Bad email");
})
};