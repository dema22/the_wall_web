import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const [username,setUsername] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await axiosInstance.get('profile/user/' + TokenService.getUserId());
                console.log(response);
                setUsername(response.data.username);
            }
        )();
    }, []);

    const viewUserPosts = async () => {
        console.log("Viewing my posts");
        // Send request to the API to view the posts from the logged user.
        const response = await axiosInstance.get('post/profile/' + TokenService.getUserId());
        console.log(response.data);
    }

    const logout = async () => {
        console.log("ENTRO A LA FUNCION DE LOG OUT");
        await axiosInstance.post('http://localhost:8000/logout/', {
            refresh_token: TokenService.getLocalRefreshToken(),
        });
        setNavigate(true)
        TokenService.removeTokenInfo();
    };

    if(navigate) {
        return <Navigate to={"/login"}/>
    }

    return <div>Profile
        <h3> Hi {username}!!!</h3>
        <button onClick={viewUserPosts}>Your posts</button>
        <button onClick={logout}>LogOut</button>
    </div>
}