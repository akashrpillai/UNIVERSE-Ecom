import React from 'react'
import { Rating } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { addItemsTocart } from '../../../actions/cartAction';
import "./allproducts.css"
const NewProductCard = ({ product }) => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(product)
    // ViewProducts
    const viewProduct = () => {
        navigate(`/product/${product._id}`)
    }
    // Add To cart
    const addProductToCart = () => {
        const quantity = 1
        if (product.stock === 0) {
            alert.show("This Product Is Currently Out Of Stock");
            return
        }
        dispatch(addItemsTocart(product._id, quantity))
        alert.success("Item Added To Cart")
        navigate("/cart")
    }
    // Add To wishlist
    // const favorite = (name) => {
    //     let namearr = []
    //     namearr.push(name)
    //     localStorage.setItem("name", namearr);
    //     alert.success("Added To WishList")
    // }
    return (

        // <Link to={`/product/${product._id}`}>
        <div className="product_list_card">
            <div className="imgBox">
                <img src={product.images[0].url} alt={product.name} />
                <ul className='action'>
                    <li>
                        <VisibilityIcon onClick={viewProduct} />
                        <span>View Product</span>
                    </li>
                    <li>
                        <ShoppingCartIcon onClick={addProductToCart} />
                        <span>Add To Cart</span>
                    </li>
                    <li>
                        <FavoriteIcon  />
                        <span>Add To Wishlist</span>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="product_name">
                    <h3>{product.name}</h3>
                </div>
                <div className="price_ratings">
                    <h2>₹{product.price}</h2>
                    <div className="rating">
                        <Rating value={product.ratings} readOnly={true} precision={0.5} />
                    </div>
                </div>
            </div>
        </div>
        // </Link>


    )
}


export default NewProductCard