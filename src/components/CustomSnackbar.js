import {useEffect, useState} from "react";
import {Button, Snackbar} from "@mui/material";

export default function CustomSnackbar(props) {
    console.log("entro al comp de snackbar");
    console.log(props);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
        </>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={props.message}
                action={action}
            />
        </div>
    );
}