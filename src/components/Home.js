import axios from "axios";
import {useEffect, useState} from 'react';
import {Card} from "@mui/material";
import {Post} from "./Post";
import './Home.css';

export const Home = () => {
    const [posts,setPosts] = useState([]);

    // useEffect doesn't expect the callback function to return Promise, using self invoking async function.
    useEffect(() => {
        (
            async () => {
                try {
                    // Get all posts
                    const postsResponse = await axios.get('http://localhost:8000/posts/');
                    console.log(postsResponse.data);
                    // store our posts in react state
                    setPosts(postsResponse.data);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [])

    const renderPosts = () => {
        console.log("entro a render posts");
        console.log(posts.length);
        if (posts.length < 1) {
            return(
                <Card> No comments yet, create a new comment!</Card>
            )
        }
        return posts.map( (post) => {
             let formattedDate = post.created_at.split('T');
             let hoursAndMinutes= formattedDate[1].split(':');
             return (
                 <Post
                     key={post.id}
                     content={post.content}
                     title={post.title}
                     author={post.user_name}
                     time={`${formattedDate[0]}  ${hoursAndMinutes[0]}:${hoursAndMinutes[1]}`}
                     showAuthor={true}
                 >
                 </Post>
             )
         })
    };

    return (
        <div>
            <h1>¡ Welcome to the wall !</h1>
            <h2>Check what people is posting 😀</h2>
            <>
                {renderPosts()}
            </>
        </div>
    );
}