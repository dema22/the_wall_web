import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import axiosInstance from "../interceptors/axios";
import TokenService from "../services/TokenService";

export const CreatePostDialog = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createPost = async (e) => {
        console.log("Creating post");
        e.preventDefault();
        const user_id = TokenService.getUserId();
        const response = await axiosInstance.post('posts/', {
            title, content, user_id
        });
        handleClose();
    };
    return (
        <div>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                CREATE A NEW POST
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
                            onChange={ e => setTitle(e.target.value) }
                            inputProps={{ maxLength: 20 }}
                        />
                        <TextField
                            required
                            variant="outlined"
                            label="Content"
                            margin="dense"
                            multiline
                            fullWidth
                            maxRows={10}
                            onChange={ e => setContent(e.target.value) }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}