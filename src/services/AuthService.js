import TokenService from "./TokenService";
import axios from "axios";

const logout = async () => {
    console.log("ENTRO A LA FUNCION DE LOG OUT");
    /*const accessToken = TokenService.getLocalAccessToken();
    await axios.post('http://localhost:8000/logout/', {
        refresh_token: TokenService.getLocalRefreshToken(),
    },{
        headers: { 'Authorization': `Bearer ${accessToken}`}
    });*/
    TokenService.removeTokenInfo();
};

const AuthService = {
    logout
};

export default AuthService;