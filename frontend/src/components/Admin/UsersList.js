import React, { Fragment, useEffect } from 'react'
import AntDesignGrid from "../Order/AntDesignGrid";
import Loader from "../layouts/loader/Loader"
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from "react-router-dom"
import MetaData from '../layouts/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import './productlist.css'
import { getAllUsers, deleteUser, clearError } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConst';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users, loading } = useSelector((state) => { return state.allUsers });
  const { error: deletionError, isDeleted, message, loading: delLoading } = useSelector((state) => { return state.profile });

  const deleteUserHandler = (id) => {
    // console.log(id)
    dispatch(deleteUser(id));
  };

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
      alert.success(message)
      navigate("/admin/users")
      dispatch({ type: DELETE_USER_RESET })
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deletionError, isDeleted, navigate, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.4,
    },


    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.2,
      cellClassName: (params) => {
        return params.row.role === "ADMIN"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Tooltip title="Update">
              <Link to={`/admin/user/${params.row.id}`}>
                <IconButton>
                  <EditIcon className='editbtn' />
                </IconButton>

              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => { deleteUserHandler(params.row.id) }} >
                <DeleteIcon className='deletebtn' />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      },

    },
  ];

  const rows = [];

  users && users.forEach((user) => {
    rows.push({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.toUpperCase(),
    });
  });


  return (
    <Fragment>
      <MetaData title={`All Users | Dashboard | UNIVERSE`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading || delLoading ? (<Loader title={delLoading && "Deleting User"} />) : (
            <Fragment>
              <h1 id="tableHeadingtwo">ALL Users</h1>

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
export default UsersList;