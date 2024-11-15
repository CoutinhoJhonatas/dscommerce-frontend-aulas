import QueryString from "qs";
import { CredentialsDTO } from "../models/Auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    //Gera o corpo no tipo application/x-www-form-urlencoded a partir do body json
    const requestBody = QueryString.stringify({...loginData, grant_type: "password"});

    const config : AxiosRequestConfig = {
        method:"POST",
        url: "/oauth2/token",
        data: requestBody,
        headers
    }

    return requestBackend(config);
}