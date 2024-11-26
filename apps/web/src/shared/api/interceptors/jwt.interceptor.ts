import { tokenService } from "@/shared/lib/token/TokenService";
import { AuthRefreshResponseDto } from "@cloud/shared";
import { AxiosInstance } from "axios";

export const addJwtInterceptor = (axios: AxiosInstance) => {
    axios.interceptors.request.use(
        async (config) => {
            const token = tokenService.getStoredToken();

            if (token) {
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
                config.sent = true;

                try {
                    const response =
                        await axios.post<AuthRefreshResponseDto>("/api/auth/refresh");

                    const { token, tokenExpiration } = response.data;

                    tokenService.store(token, tokenExpiration);

                    if (token) {
                        return axios(config);
                    }
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);

                    tokenService.clear();

                    await axios.post("/api/auth/logout");
                }
            }

            return Promise.reject(error);
        },
    );
};
