import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/'
let refresh = false;

axios.interceptors.response.use(response => response, async error => {
    if(error.response.status === 401 && !refresh){
        refresh = true;
        console.log("Error 401");
        console.log("Getting refresh token from local storage");
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);

        const response = await axios.post('token/refresh/', {
            refresh : refreshToken
        });

        if(response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            console.log(axios);
            // redo previous requests that failed
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
})
