import axios from "axios";

let baseUri = "https://localhost:44318/api"
let Api = axios.create({
    baseURL: baseUri,
    headers: {
        "content-type": "multipart/form-data",
        "Authorization": "Bearer " + window.localStorage.getItem("token")
    }
});

export const UploadFiles = async (files) => {
    return await Api.post("/Teams/upload-files/", files)
        .then((response) => {
            return response.data;
        }).catch(error => {
            console.log(error);
        })
};