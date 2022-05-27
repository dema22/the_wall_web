import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {CreatePostDialog} from "./CreatePostDialog";
import {Card} from "@mui/material";
import {Post} from "./Post";

export const Profile = () => {
    const [username,setUsername] = useState('');
    const [userPosts,setUserPosts] = useState([]);

    // Run only on the first render
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
        // We Send request to the API to get all posts from the logged user.
        const userPostResponse = await axiosInstance.get('post/profile/' + TokenService.getUserId());
        console.log(userPostResponse.data);
        setUserPosts(userPostResponse.data);
    }

    // We render Post Components using our state variable (posts).
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
                    showAuthor={false}
                >
                </Post>
            )
        })
    };
    // Functions that is triggered from the CreateDialogPost component. We receive the new post, and we update our state array with the new post.
    const addNewPost = (newPost) => {
        setUserPosts([newPost,...userPosts]);
    };

    return (
        <div style={{textAlign: "center"}}>
            <h2> 👋 {username}!!!</h2>
            <p> From your profile can view all the post you have created so far or create a new one</p>
            <CreatePostDialog addPost={addNewPost}/>
            <>
                {renderUserPosts()}
            </>
        </div>
    );
}