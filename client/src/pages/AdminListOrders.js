import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "./Store";
import { getError } from "../utils";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state };
//     case "FETCH_SUCCESS":
//       return {
//         ...state,
//         orders: action.payload,
//         loading: false,
//       };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export default function AdminListOrders() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const [pageSize, setPageSize] = useState(30);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const { userInfo } = state;

  // const [{ loading, error }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   error: "",
  // });

  const fetchData = async () => {
    try {
      // dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(
        `/api/orders/ordersList?page=${page}&pageSize=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data.orders);
      setOrders((prevOrders) => [...prevOrders, ...data.orders]); 
    } catch (err) {
      // dispatch({
      //   type: "FETCH_FAIL",
      //   payload: getError(err),
      // });
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight -
        window.innerHeight -
        document.documentElement.scrollTop <=
      700
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userInfo, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, [userInfo, page]);

  return (
    <div>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1 className="main-heading my-3">Orders</h1>
     
       
        <table className="table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : "DELETED USER"}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders available.</td>
              </tr>
            )}
          </tbody>
        </table>
      
    </div>
  );
}
