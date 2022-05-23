import axios from "axios";
import {useEffect, useState} from 'react';

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

    return (
        <div>Welcome to the wall! Check what people is posting :)
        {posts.map((post) => {
        return (
            <div key={post.id} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px"  }}>
                <div>Created at: {post.created_at.toString()}</div>
                <div>Created by: {post.user_name}</div>
                <div>Title: {post.title}</div>
                <div>Content: {post.content}</div>
            </div>
        )
        })}
        </div>
    );
}