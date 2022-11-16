import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useAlert } from "react-alert"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, clearError } from "../../../actions/productAction"
import Loader from '../../layouts/loader/Loader';
import ProductList from "./ProductList.js"
import ProductFilters from "./ProductFilters.js"
import PagenationBox from "./Pagenation.js"
import "./allproducts.css"
import NewProductCard from './NewProductCard';
import EmptyProduct from './EmptyProduct';
import "./sidebar.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterListIcon from '@mui/icons-material/FilterList';
import Typography from '@mui/material';
import SliderProton from '../SliderProton';
const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const AllProducts = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const { keyword } = useParams();
    const navigate = useNavigate();


    const { loading, error, products, productCounts, resultPerPage, filteredProductsCount } = useSelector((state) => state.products)

    const [isActive, setIsActive] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    useMemo(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert])

    console.log("loading=>", loading, products, productCounts)

    // To set Current Page
    const setCurrentPageNo = (pageno) => {
        // console.log(pageno)
        setCurrentPage(pageno)
    }

    // To set Price
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    let count = filteredProductsCount;
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <div className='AllProductsContainer'>
                        {/* close */}
                        <nav className="sidebar">
                            <header>
                                <div className="image-text">
                                    <span className="image">
                                        <FilterListIcon />
                                    </span>

                                    <div className="text logo-text">
                                        <span className="name">Filter Box</span>
                                    </div>
                                </div>
                                <ArrowForwardIosIcon className={`toggle${isActive ? " close" : ""}`} onClick={() => { setIsActive(!isActive) }} />
                            </header>

                            <div className="menu-bar">
                                <div className="menu">
                                    <ul className="menu-links">
                                        <li className="nav-link">
                                            <div className="pricebox">
                                                <Typography>Price</Typography>
                                                <SliderProton
                                                    value={price}
                                                    onChange={priceHandler}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="range-slider"
                                                    min={0}
                                                    max={25000}

                                                />
                                            </div>

                                        </li>

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


                                        <li className="nav-link">
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
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </nav>

                        <section className="home ">
                        <h2 className="productsHeading">{keyword ? "showing results for " + keyword : ""}{category ? " " + category : " Products"}</h2>
                            <div className='productList_contianer'>

                                {products && products[0] ? <ProductList products={products} /> : <EmptyProduct />}
                            </div>

                        </section>
                    </div>
                    {/* <PagenationBox /> */}
                </Fragment>
            )}
        </Fragment>
    )
}

export default AllProducts