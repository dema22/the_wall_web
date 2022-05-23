import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {CreatePostDialog} from "./CreatePostDialog";
import {Button} from "@mui/material";

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

    return (
        <div>
            <h3> Hi {username}!!!</h3>
            <p>Now that you have an account, you can :</p>
            <Button variant="outlined" size="small" onClick={viewUserPosts}>VIEW YOUR POSTS</Button>
            <CreatePostDialog/>
        {userPosts.map((post) => {
            return (
                <div key={post.id} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px"  }}>
                    <div>Created at: {post.created_at.toString()}</div>
                    <div>Title: {post.title}</div>
                    <div>Content: {post.content}</div>
                </div>
            )
        })}
        </div>
    );
}