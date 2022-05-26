import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {CreatePostDialog} from "./CreatePostDialog";
import {Button, Card} from "@mui/material";
import {Post} from "./Post";
import './Profile.css';

export const Profile = () => {
    const [username,setUsername] = useState('');
    const [userPosts,setUserPosts] = useState([]);

    useEffect(() => {
        getUserInfo();
        getUserPosts();
    }, []);

    const getUserInfo = async () => {
        const response = await axiosInstance.get('profile/user/' + TokenService.getUserId());
        console.log(response);
        setUsername(response.data.username);
    }

    const getUserPosts = async () => {
        // Send request to the API to view the posts from the logged user.
        const userPostResponse = await axiosInstance.get('post/profile/' + TokenService.getUserId());
        console.log(userPostResponse.data);
        setUserPosts(userPostResponse.data);
    }

    const renderUserPosts = () => {
        console.log(userPosts);
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
                    showAuthor={false}
                >
                </Post>
            )
        })
    };
    const addNewPost = (newPost) => {
        setUserPosts([newPost,...userPosts]);
    };

    return (
        <div>
            <h2> 👋 {username}!!!</h2>
            <p> From your profile can view all the post you have created so far or create a new one</p>
            <CreatePostDialog addPost={addNewPost}/>
            <>
                {renderUserPosts()}
            </>
        </div>
    );
}