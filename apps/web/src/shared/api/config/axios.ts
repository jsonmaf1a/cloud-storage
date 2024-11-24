import axios from "axios";
import { addJwtInterceptor } from "../interceptors/jwt.interceptor";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:1312/", // TODO: avoid using plain values
    withCredentials: true,
});

addJwtInterceptor(axiosInstance);
