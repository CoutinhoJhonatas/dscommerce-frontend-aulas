/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/Auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localstorage/access-token-repository";
import jwtDecode from "jwt-decode";

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

export function logout() {
    accessTokenRepository.remove();
}

export function saveAccessToken(token: string) {
    accessTokenRepository.save(token);
}

export function getAccessToken() {
    return accessTokenRepository.get();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined { 
    try { 
        const token = accessTokenRepository.get(); 
        return token == null 
            ? undefined 
            : (jwtDecode(token) as AccessTokenPayloadDTO); 
    } catch(error) { 
        return undefined; 
    } 
}

export function isAuthenticated(): boolean{ 
    const tokenPayload = getAccessTokenPayload(); 
    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false; 
}

export function hasAnyRoles(roles: RoleEnum[]): boolean { 
    if(roles.length === 0) { 
        return true; 
    }

    const tokenPayload= getAccessTokenPayload(); 
    if(tokenPayload !== undefined) { 
        for(let i = 0; i < roles.length; i++) { 
            if(tokenPayload.authorities.includes(roles[i])) { 
                return true; 
            } 
        } 
        //return roles.some(role => tokenData.authorities.includes(role)); 
    } 
    return false; 
}