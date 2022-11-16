import React from 'react'
import Profile from '../../images/emptyProfile.jpg'
import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {


    const options = {
        readOnly: true,
        precision: 0.5,
        value: review.rating,
    }
    return (
        <div className='reviewCard'>
            <img src={Profile} alt="USER" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className='reviewCard-span'>{review.comment}</span>
        </div>
    )
}

export default ReviewCard