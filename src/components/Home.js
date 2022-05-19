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
    return <div>Home
        <h3> Hi {username}!!!</h3>
    </div>
}