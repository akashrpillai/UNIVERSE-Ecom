import React, { Fragment, useEffect } from 'react'
import AntDesignGrid from "../Order/AntDesignGrid";
import Loader from "../layouts/loader/Loader"
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from "react-router-dom"
import { clearError, getAllProductsAdmin, deleteProduct } from '../../actions/productAction';
import MetaData from '../layouts/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import './productlist.css'
import { DELETE_PRODUCT_RESET } from '../../constants/productConst';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, products, loading } = useSelector((state) => { return state.products });
    const { error: deletionError, isDeleted, loading: delLoading } = useSelector((state) => { return state.product });
    const deleteProductHandler = (id) => {
       
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (deletionError) {
            alert.error(deletionError);
            dispatch(clearError());
        }
        if (isDeleted) {
            alert.success("Product Deleted Successfully.")
            navigate("/admin/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        dispatch(getAllProductsAdmin());
    }, [dispatch, alert, error, deletionError, isDeleted, navigate]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Tooltip title="Update">
                            <Link to={`/admin/product/${params.row.id}`}>
                                <IconButton>
                                    <EditIcon className='editbtn' />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => { deleteProductHandler(params.row.id) }} >
                                <DeleteIcon className='deletebtn' />
                            </IconButton>
                        </Tooltip>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        });
    });


    return (
        <Fragment>

            <MetaData title={`All Products | Dashboard | UNIVERSE`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    {loading || delLoading ? (<Loader title={delLoading && "Deleting Product"} />) : (
                        <Fragment>
                            <h1 id="tableHeadingtwo">ALL PRODUCTS</h1>

                            <AntDesignGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                className="productListTable"
                            />

                        </Fragment>
                    )}
                </div>
            </div>

        </Fragment >
    )
}

export default ProductList