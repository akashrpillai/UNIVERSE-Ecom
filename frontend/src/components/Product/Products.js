import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from '../layouts/loader/Loader';
import { getProduct, clearError } from "../../actions/productAction";
import ProductCard from "../home/ProductCard";
import SliderProton from './SliderProton'
import Typography from '@mui/material/Typography'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';

import './products.css'
import MetaData from '../layouts/MetaData';
import PagenationBox from './AllProducts/Pagenation';
// import NewProductCard from './AllProducts/NewProductCard';



const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { keyword } = useParams();
    const navigate = useNavigate();
    // console.log("keywordvalue=>",keyword)

    const { loading, error, products, productCounts, resultPerPage, filteredProductsCount } = useSelector((state) => state.products)

    const [isActive, setIsActive] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 500000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert])
    console.log("loading=>", loading, products, productCounts)

    // To set Current Page
    const setCurrentPageNo = (pageno) => {
        // console.log("pageno is",pageno)
        setCurrentPage(pageno)
    }

    // To set Price
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    let count = filteredProductsCount;
    return (
        <Fragment>
            {loading ? (<Loader />) :
                (<Fragment>
                    <MetaData title={`PRODUCTS ${category ? "| " + category : ""}`} />
                    <div className="productContainer">
                        <h2 className="productsHeading">{keyword ? "showing results for " + keyword : ""}{category ? " " + category : " Products"}</h2>
                        {loading === false ? products[0] ? " " : <h2 className="productsHeading2">No Products To Show</h2> : " "}
                        {keyword ? <Button onClick={() => { navigate("/products") }} style={{ "width ": "10vw", "margin": "0 auto" }} variant="outlined">Back To All Products</Button> : ""}
                        <div className="twobox">
                            <div className={`filterBox${isActive ? " resfilter" : ""}`} onClick={() => { setIsActive(!isActive) }}>
                                <div className={`arrow${isActive ? " responsive" : ""}`} onClick={() => { setIsActive(!isActive) }}>
                                    <span id="arrow"><h3>Filters</h3><ArrowForwardIcon /></span>
                                    <span id="cross"><ClearIcon /></span>
                                </div>
                                <Typography>Price</Typography>
                                <SliderProton
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={25000}

                                />
                                <Typography>Categories</Typography>
                                <ul className="categoryBox">
                                    {categories.map((category) => {
                                        return (
                                            <li className={`category-link`} key={category} onClick={() => { setCategory(category) }}>
                                                {category}
                                            </li>
                                        )
                                    })}
                                </ul>
                                <fieldset>
                                    <Typography component="legend">Ratings Above</Typography>
                                    <SliderProton
                                        value={ratings}
                                        onChange={(e, newRating) => {
                                            setRatings(newRating);
                                        }} 
                                        aria-labelledby="continuous-slider"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5}
                                    />
                                </fieldset>
                            </div>
                            <div className="products">
                                {products && products.map((product) => {
                                    return (
                                        <ProductCard key={product._id} product={product} />
                                        // <NewProductCard key={product._id} product={product}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {resultPerPage < count && (<div className="paginationBox">
                        <PagenationBox currentPage={currentPage}
                            resultPerPage={resultPerPage}
                            productCounts={productCounts}
                            setCurrentPageNo={setCurrentPageNo} />
                    </div>)}
                </Fragment>)}
        </Fragment>
    )
}

export default Products