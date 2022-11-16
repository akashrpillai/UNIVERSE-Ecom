import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewProduct, clearError } from "../../actions/productAction"
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layouts/MetaData";
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AbcIcon from '@mui/icons-material/Abc';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConst";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import Loader from "../layouts/loader/Loader";


const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newProduct);
    // console.log("loading=>", loading, "succ", success)
    const [newproduct, setNewproduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const { name, price, description, category, stock } = newproduct;
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
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, navigate, success]);
    const newproductOnChange = (e) => {
        console.log("onchangeproduct", e.target.name, e.target.value)
        setNewproduct({ ...newproduct, [e.target.name]: e.target.value });
    }
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        // console.log("ProductImagesChange", e.target.files)

        setImages([]);
        setImagesPreview([]);

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
    const createProductSubmitHandler = (e) => {
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
        dispatch(createNewProduct(myForm));
    };
    return (
        <Fragment>
            <MetaData title="Create Product| UNIVERSE" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (<Loader title={"creating Product..."}/>) : (<form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <AbcIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                name="name"
                                value={name}
                                onChange={newproductOnChange}
                            />
                        </div>
                        <div>
                            <CurrencyRupeeIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                name="price"
                                onChange={newproductOnChange}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                name="description"
                                onChange={newproductOnChange}
                                cols="30"
                                rows="3"
                            ></textarea>
                        </div>

                        <div>
                            <CategoryIcon />
                            <select name="category" onChange={newproductOnChange}>
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
                                name="stock"
                                required
                                onChange={newproductOnChange}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
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
                            Create
                        </Button>
                    </form>)}
                </div>

            </div>
        </Fragment>
    )
}

export default NewProduct;