import {Button, Snackbar} from "@mui/material";

export default function CustomSnackbar(props) {
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        if(props.onClose) {
            props.onClose();
        }
    }

    const action = (
        <>
            <Button color="secondary" size="small" onClick={props.onClose}>
                Close
            </Button>
        </>
    );

    return (
        <div>
            <Snackbar
                open={props.open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={props.message}
                action={action}
            />
        </div>
    );
}