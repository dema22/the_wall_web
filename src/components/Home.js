import axios from "axios";
import {useEffect, useState} from 'react';
import {Post} from "./Post";
import CustomSnackbar from "./CustomSnackbar";

export const Home = () => {
    const [posts,setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (
            async () => {
                try {
                    // Get all posts from all users.
                    const postsResponse = await axios.get('http://localhost:8000/posts/');
                    // Store our posts in react state
                    setPosts(postsResponse.data);
                } catch (error) {
                    setErrorMessage("We are sorry, something went wrong. Try again later.");
                }
            }
        )();
    }, [])

    // We render Post Components using our state variable (posts).
    const renderPosts = () => {
        if (posts.length < 1) {
            return(
                <p style={{textAlign: "center"}}> Nobody has commented yet ...  </p>
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

    const handleClose = () => {
        setErrorMessage('');
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>¡ Welcome to the wall !</h1>
            <h2>Check what people is posting 😀</h2>
            <>
                {renderPosts()}
            </>
        {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
        </div>
    );
}