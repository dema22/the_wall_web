class TokenService {
    getLocalRefreshToken() {
        const refreshToken = localStorage.getItem("refreshToken");
        return refreshToken;
    }
    getLocalAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken;
    }
    getUserId() {
        const userId = JSON.parse(localStorage.getItem("userId"));
        return userId;
    }
    updateLocalRefreshToken(token) {
        localStorage.setItem('refreshToken', token.data.refresh);
    }
    updateLocalAccessToken(token) {
        localStorage.setItem('accessToken', token.data.access);
    }
    updateUserId(userId) {
        localStorage.setItem('userId', userId);
    }
    removeTokenInfo() {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
    }
}
export default new TokenService();
