import {useEffect, useState} from 'react';
import axios from "axios";

export const Home = () => {
    const [username,setUsername] = useState('');

    useEffect(() => {
        (
            async () => {
                const userId = JSON.parse(localStorage.getItem("userId"));
                const response = await axios.get('profile/user/' + userId);
                console.log(response);
                setUsername(response.data.username);
            }
        )();
    }, []);

    const viewUserPosts = async () => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        console.log("Viewing my posts");
        // Send request to the API to view the posts from the logged user.
        const response = await axios.get('post/profile/' + userId);
        console.log(response.data);
    }

    return <div>Home
        <h3> Hi {username}!!!</h3>
        <button onClick={viewUserPosts}>Your posts</button>
    </div>
}