import React, { Fragment, useEffect } from 'react';
// import { FaRocket } from "react-icons/fa"
import MetaData from '../layouts/MetaData';
import "./home.css";
// import ProductCard from "./ProductCard.js"
import { getProduct, clearError } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layouts/loader/Loader';
import { useAlert } from "react-alert"
import WelcomePage from './WelcomePage';
import NewProductCard from "../Product/AllProducts/NewProductCard"

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, products } = useSelector((state) => state.products)
    // console.log(products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())

        }
        dispatch(getProduct());
    }, [dispatch, error, alert])



    return (
        <Fragment>
            {loading ? <Loader /> : < >
                <MetaData title={"UNIVERSE | Featured Products"} />
                {/* <div className="banner">
                    <h1>Welcome Abord Captain</h1>
                    <p>Ready To Explore Universe ?</p>


                    <a href="#container">
                        <button>
                            Let's Go<FaRocket size={"2rem"} />
                        </button>
                    </a>
                </div> */}
                <WelcomePage />
                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id='container'>
                    {products && products.map((product) => {
                        return (
                            // <ProductCard key={product._id} product={product} />
                            <NewProductCard key={product._id} product={product} />
                        )
                    })}

                </div>

            </>}
        </Fragment>
    )
}

export default Home