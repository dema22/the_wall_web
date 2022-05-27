import axios from "axios";
import TokenService from "../services/TokenService";
const baseURL = "http://localhost:8000/";

// Create a custom axios instance.
const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
// Add an interceptor to every request, so I can send an Authorization header with the access token.
axiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// I will also add logic to intercept every failed response.
// If they fail with status code 401 (Unauthorized), then I will try to get a new access token calling my refresh token endpoint.
// If I get a new token, I saved it on local storage. If something fails, I will remove everything from local storage and force a redirect to login template.

axiosInstance.interceptors.response.use(response => response, async (err) => {
        const { response, config } = err;

        if (response.status !== 401) {
            return Promise.reject(err);
        }

        try {
            const rs = await axios.post(baseURL + "token/refresh/", {
                refresh: TokenService.getLocalRefreshToken(),
            });
            TokenService.updateLocalAccessToken(rs);
            return axiosInstance(config);
        } catch (_error) {
            TokenService.removeTokenInfo();
            window.location.href = "http://localhost:3000/login"
            return Promise.reject(_error);
        }
    }
);
export default axiosInstance;
