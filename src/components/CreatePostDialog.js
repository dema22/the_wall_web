import {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";
import CustomSnackbar from "./CustomSnackbar";

export const CreatePostDialog = (props) => {
    // state to control dialog
    const [open, setOpen] = useState(false);
    // state inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // state for error validators
    const [titleErrValidator, setTitleErrValidator] = useState('');
    const [contentErrValidator, setContentErrValidator] = useState('');
    // state for error message
    const [errorMessage, setErrorMessage] = useState('');

    // Function to open the dialog.
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close dialog. We reset all errors state variables before closing.
    const handleClose = () => {
        setTitleErrValidator('');
        setContentErrValidator('');
        setOpen(false);
    };

    // If there is no errors in the state validators variables, we are going to create a post for the logged user.
    const createPost = async (e) => {
        try {
            e.preventDefault();

            if(!Boolean(titleErrValidator) && !Boolean(contentErrValidator)) {
                const user_id = TokenService.getUserId();
                const createdPost = await axiosInstance.post('posts/', {
                    title, content, user_id
                });
                // We create a new post object based on the createdPost response from the API.
                // We send it to the parent component (Profile)
                props.addPost({
                    id: createdPost.data.id,
                    created_at: createdPost.data.created_at,
                    title:createdPost.data.title,
                    content:createdPost.data.content
                });
                handleClose();
            }
        }catch (e) {
            setErrorMessage("We are sorry, something went wrong. Try again later.");
        }
    };

    // Inputs validators
    const validateTitle = (e) => {
        const value = e.target.value.trim();
        setTitleErrValidator('');
        setTitle(value);
        if(value.length < 5 || value.length > 50) {
            setTitleErrValidator("Post title must have at least 5 characters and no more than 50.");
        }
    }
    // Inputs validators
    const validateContent = (e) => {
        const value = e.target.value.trim();
        setContentErrValidator('');
        setContent(value);
        if(value.length < 10) {
            setContentErrValidator("Post content must have at least 10 characters.");
        }
    }

    const handleCloseSnackbar = () => {
        setErrorMessage('');
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button variant="outlined" size="small" onClick={handleClickOpen}>
                    CREATE A NEW POST
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <form onSubmit={createPost}>
                    <DialogTitle>Create a new Post!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This post will be shared with all users in The Wall!!
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            variant="standard"
                            onChange={ validateTitle }
                            error={Boolean(titleErrValidator)} helperText={(titleErrValidator)}
                        />
                        <TextField
                            required
                            variant="outlined"
                            label="Content"
                            margin="dense"
                            multiline
                            fullWidth
                            rows={6}
                            onChange={ validateContent }
                            error={Boolean(contentErrValidator)} helperText={(contentErrValidator)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
            {errorMessage && <CustomSnackbar onClose={handleCloseSnackbar} open={true} message={errorMessage} />}
        </>
    );
}