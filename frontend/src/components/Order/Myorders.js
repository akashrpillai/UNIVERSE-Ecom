import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getOrders } from '../../actions/orderAction';
import { Typography } from '@mui/material';
import Loader from "../layouts/loader/Loader"
import MetaData from '../layouts/MetaData';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import "./orders.css"




const Myorders = () => {
    const { user } = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const alert = useAlert()
    const dispatch = useDispatch();
    // console.log(loading ? "loading" : orders ? orders[0].createdAt : orders)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 250, flex: 1, },
        { field: "createdAt", headerName: "Ordered On", minWidth: 150, flex: 0.5, type: "date" },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            headerAlign: "center",
            align: 'center',
            minWidth: 100,
            flex: 0.5,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },

        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.5,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ]
    const rows = []
    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
            createdAt: item.createdAt.slice(0, 10),
        });
    });
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getOrders());
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={`My orders | UNIVERSE`} />
            {loading ? <Loader /> : (
                <div className="myOrdersPage" style={{ textAlign: "center" }}>
                    <Typography id="myTableHeading">{user.name}'s Orders</Typography>
                    <Box sx={{ height: 800, width: '90%', margin: "auto" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            components={{
                                NoRowsOverlay: () => (
                                    <Stack height="100%" alignItems="center" justifyContent="center">
                                       You Don't have any Orders Yet
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack height="100%" alignItems="center" justifyContent="center">
                                        No result Found
                                    </Stack>
                                )
                            }}
                            className="myOrdersTable"
                            autoHeight
                        />
                    </Box>


                </div>
            )
            }
        </Fragment>
    )
}

export default Myorders