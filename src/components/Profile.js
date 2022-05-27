import {useEffect, useState} from 'react';
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import {CreatePostDialog} from "./CreatePostDialog";
import {Post} from "./Post";
import CustomSnackbar from "./CustomSnackbar";

export const Profile = () => {
    const [username,setUsername] = useState('');
    const [userPosts,setUserPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Run only on the first render
    useEffect(() => {
        getUserInfo();
        getUserPosts();
    }, []);

    const getUserInfo = async () => {
        try {
            // We send request to the API to get the profile information of the logged user.
            const responseUserInfo = await axiosInstance.get('profile/user/' + TokenService.getUserId());
            setUsername(responseUserInfo.data.username);
        }catch(e) {
            setErrorMessage("We are sorry, something went wrong. Try again later.");
        }
    }

    const getUserPosts = async () => {
        try {
            // We Send request to the API to get all posts from the logged user.
            const userPostResponse = await axiosInstance.get('post/profile/' + TokenService.getUserId());
            setUserPosts(userPostResponse.data);
        } catch(e) {
            setErrorMessage("We are sorry, something went wrong. Try again later.");
        }
    }

    // We render Post Components using our state variable (posts).
    const renderUserPosts = () => {
        if (userPosts.length !== 0) {
            return userPosts.map((post) => {
                let formattedDate = post.created_at.split('T');
                let hoursAndMinutes = formattedDate[1].split(':');
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
            });
        }
    };
    // Functions that is triggered from the CreateDialogPost component. We receive the new post, and we update our state array with the new post.
    const addNewPost = (newPost) => {
        setUserPosts([newPost,...userPosts]);
    };

    const handleClose = () => {
        setErrorMessage('');
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2> 👋 {username}!!!</h2>
            <p> From your profile you can view all the post you have created so far or create a new one</p>
            <CreatePostDialog addPost={addNewPost}/>
            <>
                {renderUserPosts()}
            </>
            {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
        </div>
    );
}