import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, getProductDetails, clearError } from "../../actions/productAction"
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layouts/MetaData";
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AbcIcon from '@mui/icons-material/Abc';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConst";
import { useNavigate, useParams } from "react-router-dom";
import "./newProduct.css";
import Loader from "../layouts/loader/Loader";


const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { productId } = useParams();
    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
    // console.log("loading=>", loading, "succ", success)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, product, productId]);

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        // console.log("ProductImagesChange", e.target.files) 

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };
    return (
        <Fragment>
            <MetaData title="Update Product| UNIVERSE" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (<Loader title={"updating Product "} />) : (<form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >

                        <h1>Update Product</h1>

                        <div>
                            <AbcIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <CurrencyRupeeIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="3"
                            ></textarea>
                        </div>

                        <div>
                            <CategoryIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InventoryOutlinedIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                           Update
                        </Button>
                    </form>)}
                </div>

            </div>
        </Fragment>
    )
}

export default UpdateProduct;