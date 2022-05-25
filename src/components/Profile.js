import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {CreatePostDialog} from "./CreatePostDialog";
import {Button, Card} from "@mui/material";
import {Post} from "./Post";

export const Profile = () => {
    const [username,setUsername] = useState('');
    const [userPosts,setUserPosts] = useState([]);

    // useEffect doesn't expect the callback function to return Promise, using self invoking async function.
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
        const userPostResponse = await axiosInstance.get('post/profile/' + TokenService.getUserId());
        console.log(userPostResponse.data);
        setUserPosts(userPostResponse.data);
    }

    const renderUserPosts = () => {
        if (userPosts.length < 1) {
            return(
                <Card> Create a new post !</Card>
            )
        }
        return userPosts.map( (post) => {
            let formattedDate = post.created_at.split('T');
            let hoursAndMinutes= formattedDate[1].split(':');
            return (
                <Post
                    key={post.id}
                    content={post.content}
                    title={post.title}
                    author={post.user_name}
                    time={`${formattedDate[0]}  ${hoursAndMinutes[0]}:${hoursAndMinutes[1]}`}
                >
                </Post>
            )
        })
    };

    return (
        <div>
            <h3> Hi {username}!!!</h3>
            <p>Now that you have an account, you can :</p>
            <Button variant="outlined" size="small" onClick={viewUserPosts}>VIEW YOUR POSTS</Button>
            <CreatePostDialog/>
            <>
                {renderUserPosts()}
            </>
        </div>
    );
}