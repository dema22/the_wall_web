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

export const CreatePostDialog = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // error validators
    const [titleErrValidator, setTitleErrValidator] = useState('');
    const [contentErrValidator, setContentErrValidator] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitleErrValidator('');
        setContentErrValidator('');
        setOpen(false);
        console.log("cierro dialogo");
    };

    const createPost = async (e) => {
        e.preventDefault();
        console.log("Entrando a crear post");
        if(!Boolean(titleErrValidator) && !Boolean(contentErrValidator)) {
            console.log("Creating post");
            e.preventDefault();
            const user_id = TokenService.getUserId();
            const response = await axiosInstance.post('posts/', {
                title, content, user_id
            });
            handleClose();
        }
    };

    // Validators
    const validateTitle = (e) => {
        console.log(e.target.value);
        const value = e.target.value.trim();
        setTitleErrValidator('');
        setTitle(value);
        if(value.length < 5) {
            setTitleErrValidator("Post title must have at least 5 character.");
        }
    }

    const validateContent = (e) => {
        console.log(e.target.value);
        const value = e.target.value.trim();
        setContentErrValidator('');
        setContent(value);
        if(value.length < 10) {
            setContentErrValidator("Post content must have at least 10 character.");
        }
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
        </>
    );
}