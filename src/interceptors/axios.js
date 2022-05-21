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
        const { response, config } = err;

        if (response.status !== 401) {
            return Promise.reject(err);
        }

        try {
            console.log("Miro el token de refresco que tengo guardado antes de llamar al endpoint");
            console.log(TokenService.getLocalRefreshToken());
            const rs = await axios.post(baseURL + "token/refresh/", {
                refresh: TokenService.getLocalRefreshToken(),
            });
            console.log("NUEVO TOKEN DE ACCESSO QUE ME DIO EL ENDPOINT DE REFRESCO");
            console.log(rs.data.access);
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
