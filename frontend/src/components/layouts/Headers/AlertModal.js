import * as React from 'react';
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { logOut } from '../../../actions/userAction'
import { useNavigate } from 'react-router-dom'
// -------------------------------------------------
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const AlertLogOut = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseDialogforLogout = () => {
        dispatch(logOut())
        alert.success("logged out Successfully");
        navigate("/")
        setOpenDialog(false);
    };

    return (
        <div>
            <span
                onClick={handleClickOpenDialog}
            >
                LogOut
            </span>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {" Are you sure you want to Logout?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="outlined" onClick={handleCloseDialogforLogout} color="error" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AlertLogOut;
