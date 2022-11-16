import React, { Fragment, useEffect } from 'react'
import AntDesignGrid from "../Order/AntDesignGrid";
import Loader from "../layouts/loader/Loader"
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from "react-router-dom"
import { clearErrors, getAllOrders, deleteOrder } from '../../actions/orderAction';
import MetaData from '../layouts/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import './productlist.css'
import { DELETE_ORDER_RESET } from '../../constants/orderConst';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders, loading } = useSelector((state) => { return state.allOrders });
  const { error: deletionError, isDeleted, loading: delLoading } = useSelector((state) => { return state.order });

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deletionError) {
      alert.error(deletionError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully.")
      navigate("/admin/dashboard")
      dispatch({ type: DELETE_ORDER_RESET })
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deletionError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },

    {
      field: "createdAt",
      headerName: "Ordered On",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
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
              <Link to={`/admin/order/${params.row.id}`}>
                <IconButton>
                  <EditIcon className='editbtn' />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => { deleteOrderHandler(params.row.id) }} >
                <DeleteIcon className='deletebtn' />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      createdAt: item.createdAt.slice(0, 10),
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  });


  return (
    <Fragment>
      {loading ? (<Loader />) : (<Fragment>
        <MetaData title={`All Orders | Dashboard | UNIVERSE`} />
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            {loading || delLoading ? (<Loader title={delLoading && "Deleting Order"} />) : (
              <Fragment>
                <h1 id="tableHeadingtwo">ALL Orders</h1>

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
      </Fragment>)
      }
    </Fragment >
  )
}

export default OrderList