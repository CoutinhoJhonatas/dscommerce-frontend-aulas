import { requestBackend } from "../utils/requests";
import * as authServie from './auth-service';

export function findMe() {

const headers = {
    Authorization: "Bearer " + authServie.getAccessToken()
}

    return requestBackend({ url: `/users/logged`, headers });
}