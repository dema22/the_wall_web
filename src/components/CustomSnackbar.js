import {Alert, Snackbar} from "@mui/material";

export default function CustomSnackbar(props) {
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        if(props.onClose) {
            props.onClose();
        }
    }

    return (
        <div>
            <Snackbar open={props.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}