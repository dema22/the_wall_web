import axios from "axios";
import TokenService from "../services/TokenService";
const baseURL = "http://localhost:8000/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

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

axiosInstance.interceptors.response.use(response => response, async (err) => {
        const originalConfig = err.config;
        console.log("Interceptor de respuesta");
        console.log(originalConfig.url);
        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                console.log("ENTRO PORQ DIO 401");
                originalConfig._retry = true;
                try {
                    console.log("Miro el token de refresco que tengo guardado antes de llamar al endpoint");
                    console.log(TokenService.getLocalRefreshToken());
                    const rs = await axios.post(baseURL + "token/refresh/", {
                        refresh: TokenService.getLocalRefreshToken(),
                    });
                    console.log("NUEVO TOKEN DE ACCESSO QUE ME DIO EL ENDPOINT DE REFRESCO");
                    console.log(rs.data.access);
                    TokenService.updateLocalAccessToken(rs);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export default axiosInstance;
