import React, { useEffect, Fragment } from 'react'
import Sidebar from "./Sidebar.js"
import { useSelector, useDispatch } from 'react-redux';
import { getAllProductsAdmin } from '../../actions/productAction';
import './dashboard.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import MetaData from '../layouts/MetaData.js'
import { getAllOrders } from '../../actions/orderAction.js';
import Loader from "../layouts/loader/Loader"
import { getAllUsers } from '../../actions/userAction.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products, loading: productLoading } = useSelector((state) => { return state.products });
    const { orders, loading: orderLoading } = useSelector((state) => { return state.allOrders });
    const { users, loading: userLoading } = useSelector((state) => { return state.allUsers });
    // console.log("products=>", productLoading ? "loading" : products, "and", "orders=>", orderLoading ? "loading" : orders)
    let outOfStock = 0;
    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice
    })
   
    useEffect(() => {

        dispatch(getAllProductsAdmin());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'CHART',
            },
        },
    };
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#054569"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#a4222b", "#1e9f43"],
                hoverBackgroundColor: ["#b9393d", "#37c44c"],
                data: [outOfStock, products && products.length - outOfStock],
            },
        ],
    };
    return (
        <div className="dashboard">
            <MetaData title={`Admin Dashboard |UNIVERSE`} />
            <Sidebar />
            <div className="dashboardContainer">
                {productLoading && orderLoading && userLoading ? (<Loader />) : (
                    <Fragment>
                        <Typography component="h1">Dashboard</Typography>
                        <div className="dashboardSummary">
                            <div>
                                <p>
                                    Total Amount <br /> {totalAmount}
                                </p>
                            </div>
                            <div className="dashboardBox2">
                                <Link to='/admin/products'>
                                    <p>products</p>
                                    <p>{products && products.length}</p>
                                </Link>
                                <Link to='/admin/orders'>
                                    <p>orders</p>
                                    <p>{orders && orders.length}</p>
                                </Link>
                                <Link to='/admin/users'>
                                    <p>users</p>
                                    <p>{users && users.length}</p>
                                </Link>
                            </div>
                        </div>
                        <div className="lineChart">
                            <Line options={options} data={lineState} />
                        </div>
                        <div className="doughnutChart">
                            <Doughnut data={doughnutState} />
                        </div>
                    </Fragment>
                )
                }
            </div >
        </div >
    )
}

export default Dashboard