import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "./Store";
import { getError } from "../utils";

export default function AdminListOrders() {
  // Use the useNavigate hook from 'react-router-dom' to handle navigation
  const navigate = useNavigate();
  const { state } = useContext(Store);

  // State to manage the number of orders to fetch per request and the list of orders
  const [pageSize, setPageSize] = useState(30);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  // User information from the global state
  const { userInfo } = state;

  // Function to fetch order data from the server
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://main--playful-phoenix-2280d5.netlify.app/api/orders/ordersList?page=${page}&pageSize=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      // Append the new orders to the existing list
      setOrders((prevOrders) => [...prevOrders, ...data.orders]);
    } catch (err) {
      // Handle any errors from the server
      console.error(getError(err));
    }
  };

  // Function to load more orders when scrolling
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

  // Effect to fetch data when the component mounts or when the page changes
  useEffect(() => {
    fetchData();
  }, [userInfo, page]);

  // Add and remove scroll event listeners
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
