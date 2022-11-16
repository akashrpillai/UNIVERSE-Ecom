import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../../../actions/userAction';
import "./header.css"
// ----------------------------------------------------------
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';



function AlertDialog() {
    const [openDialog, setOpenDialog] = useState(false);
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
            <LogoutIcon onClick={handleClickOpenDialog} />
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

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);

    const navigate = useNavigate();


    const orders = () => {
        navigate("/orders")
    }
    const account = () => {
        navigate("/account")
    }

    const cart = () => {
        navigate("/cart")
    }
    const actions = [
        { icon: <SummarizeIcon />, name: 'Orders', func: orders },
        { icon: <SentimentSatisfiedAltIcon />, name: 'Profile', func: account },
        { icon: <Badge badgeContent={cartItems.length} color="primary"><ShoppingCartIcon style={{ color: cartItems.length > 0 ? "var(--main1)" : "unset" }} /></Badge>, name: `Cart(${cartItems.length})`, func: cart, },
        {
            icon: (
                <AlertDialog />
            ), name: 'Logout'
        }
    ];

    const dashboard = () => {
        navigate("/admin/dashboard")
    }
    if (user.role === "admin") {
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashbord', func: dashboard })
    }


    // console.log(user)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Fragment>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/emptyProfile.jgp"} alt="profileDp"></img>}
                direction="down"
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                className="SpeedDial"
            >{actions.map((action) => {
                return (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                )
            })}

            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions;
