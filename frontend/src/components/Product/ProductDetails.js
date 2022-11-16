import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./productdetails.css";
import { addNewReview, clearError, getProductDetails } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js'
import Loader from "../layouts/loader/Loader"
import IconButton from '@mui/material/IconButton';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useAlert } from "react-alert"
import MetaData from '../layouts/MetaData';
import { addItemsTocart } from '../../actions/cartAction';
import Rating from '@mui/material/Rating';
import AddReviewDialogBox from './AddReviewDialogBox';
import { NEW_REVIEW_RESET } from '../../constants/productConst';


const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector((state) => { return state.newReview })

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError())
    }
    if (reviewError) {
      alert.error(error);
      dispatch(clearError())
    }
    if (success) {
      alert.success("Review Added Successfully")
      dispatch({
        type: NEW_REVIEW_RESET
      })
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError])

  // console.log("from productcomp", "state", loading, loading ? "laoding" : product.images,"error=>",error)
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      alert.info(`max ${product.stock} items is present in stocks`)
      return
    }
    setQuantity(quantity => quantity + 1)
  }
  const decreaseQuantity = () => {
    // if (quantity <= 1) {
    //   return
    // }
    setQuantity(quantity => quantity - 1)
  }

  // Add to Cart
  const addProductToCart = () => {
    if (product.stock === 0) {
      alert.show("This Product Is Currently Out Of Stock");
      return
    }
    dispatch(addItemsTocart(id, quantity))
    alert.success("Item Added To Cart")
  }

  // SubmitToggle For reviw Submit
  const submitReviewToggle = () => {
    setOpen(!open)
  }

  // Add Review
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(addNewReview(myForm));

    setOpen(false);
  };


  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <>
      {loading ? <Loader /> : (<>
        <MetaData title={`${product.name} | UNIVERSE`} />
        <div className="ProductDetails">
          <div>
            <Carousel className='caroimages'
            height="50vh">
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div>
            <div className="details-1">
              <h2>{product.name}</h2>
              <p>Product #{product._id}</p>
            </div>
            <div className="details-2">
              <Rating name="half-rating" {...options} />
              <span className='details-2-span'>{`(${product.numOfreview}) Reviews`}</span>
            </div>
            <div className="details-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="details-3-1">
                <div className="add-remove-btn">
                  <IconButton aria-label="add" onClick={decreaseQuantity} disabled={quantity <= 1 ? true : false} size="small">
                    <RemoveCircleRoundedIcon fontSize="large" />
                  </IconButton>
                  <input type="number" value={`${product.stock < 1 ? product.stock : quantity}`} readOnly />
                  <IconButton onClick={increaseQuantity} size="small" disabled={product.stock < 1 ? true : false} >
                    <AddCircleRoundedIcon fontSize="large" />
                  </IconButton>
                </div>
                <button onClick={addProductToCart}>Add to Cart</button>
              </div>
              <p>
                Status:<b className={product.stock < 1 ? "redColor" : "greenColor"}>{product.stock < 1 ? "OutOfStock" : "InStock"}</b>
              </p>
            </div>
            <div className="details-4">
              Description: <p> {product.description} </p>
            </div>
            <button onClick={submitReviewToggle} className='submitReview'>Add Review</button>
          </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>
        <AddReviewDialogBox
          submitReviewToggle={submitReviewToggle}
          open={open}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          reviewSubmitHandler={reviewSubmitHandler}
        />
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && product.reviews.map((review) => {
              return (
                <ReviewCard key={review._id} review={review} />
              )
            })}
          </div>) : (<p className="noreview">No Reviews Yet</p>)}
      </>)}
    </>
  )
}

export default ProductDetails