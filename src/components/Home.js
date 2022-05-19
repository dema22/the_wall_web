import {useEffect, useState} from 'react';
//import axios from "axios";
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";

export const Home = () => {
    const [username,setUsername] = useState('');
    const userId = TokenService.getUserId();

    useEffect(() => {
        (
            async () => {
                const response = await axiosInstance.get('profile/user/' + userId);
                console.log(response);
                setUsername(response.data.username);
            }
        )();
    }, []);

    const viewUserPosts = async () => {
        console.log("Viewing my posts");
        // Send request to the API to view the posts from the logged user.
        const response = await axiosInstance.get('post/profile/' + userId);
        console.log(response.data);
    }

    return <div>Home
        <h3> Hi {username}!!!</h3>
        <button onClick={viewUserPosts}>Your posts</button>
    </div>
}