import { AUTH_STORAGE_KEYS } from "@/shared/constants";
import { AuthRefreshResponseDto } from "@cloud/shared";
import { AxiosInstance } from "axios";

export const addJwtInterceptor = (axios: AxiosInstance) => {
    axios.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

            if (token) {
                console.log("token", token);
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        async (error) => Promise.reject(error),
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error?.config;

            if (!config) return Promise.reject(error);

            if (error.response?.status === 401 && !config.sent) {
                console.log("refresh");

                config.sent = true;
                const response = (await axios
                    .post("/api/auth/refresh")
                    .then((res) => res.data)) as AuthRefreshResponseDto;

                const { token, tokenExpires } = response;

                localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
                localStorage.setItem(
                    AUTH_STORAGE_KEYS.TOKEN_EXPIRES,
                    String(tokenExpires),
                );

                if (token) {
                    return axios(config);
                }
            }

            return Promise.reject(error);
        },
    );
};
