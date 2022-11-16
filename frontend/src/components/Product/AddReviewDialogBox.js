import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Slide from '@mui/material/Slide';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddReviewDialogBox = ({ submitReviewToggle, open, rating, setRating, comment, setComment, reviewSubmitHandler }) => {


    return (
        <Dialog aria-labelledby="simple-dialog-title"
            open={open}
            // onClose={submitReviewToggle}
            TransitionComponent={Transition}
        >
            <DialogTitle>Add Your Review</DialogTitle>
            <DialogContent className="submitDialog">

                <Rating
                    onChange={(e) => setRating(e.target.value)}
                    precision={0.5}
                    value={rating}
                    sx={{
                        "& .MuiRating-iconFilled": {
                            color: "tomato"
                        },
                    }}
                />
                <TextField
                    id="filled-textarea"
                    label="Comment"
                    variant="filled"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} variant="contained" color="success">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddReviewDialogBox;