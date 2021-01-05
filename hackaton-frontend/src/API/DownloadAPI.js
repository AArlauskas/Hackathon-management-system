import axios from "axios";

let baseUri = "https://localhost:44318/api"
let Api = axios.create({
    baseURL: baseUri,
    responseType: "blob",
    headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("token")
    }
});

export const DownloadFileUser = async (file) => {
    return await Api.get("/Teams/download-file/", {
        params: {
            fileName: file
        }
    })
        .then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = downloadUrl;

            link.setAttribute('download', file); //any other extension

            document.body.appendChild(link);

            link.click();

            link.remove();
        })
};

export const DownloadFileAdmin = async (id,file) => {
    return await Api.get("/Teams/admin/download-file/" + id, {
        params: {
            fileName: file
        }
    })
        .then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = downloadUrl;

            link.setAttribute('download', file); //any other extension

            document.body.appendChild(link);

            link.click();

            link.remove();
        })
};

export const DownloadPublicFile = async (id,file) => {
    return await Api.get("/Teams/public/download-file/" + id, {
        params: {
            fileName: file
        }
    })
        .then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = downloadUrl;

            link.setAttribute('download', file); //any other extension

            document.body.appendChild(link);

            link.click();

            link.remove();
        })
};