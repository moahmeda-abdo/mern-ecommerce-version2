import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from './Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/esm/Button';

// Define a reducer function to manage component state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  // Get user information from the global store
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Get the navigate function to programmatically navigate to other pages
  const navigate = useNavigate();

  // Initialize component state using the reducer
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    // Fetch user's order history data when the component mounts or when userInfo changes
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `https://main--playful-phoenix-2280d5.netlify.app/api/orders/orderhistory`,
          // Include the user's authorization token in the request headers
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        // Handle fetch error and update component state
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1 className="main-heading my-3">Order History</h1>
      {loading ? (
        // Display a loading spinner while fetching data
        <LoadingBox></LoadingBox>
      ) : error ? (
        // Display an error message if data fetching fails
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              // Render a table row for each order in the user's history
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {/* Display whether the order is paid or not */}
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </td>
                <td>
                  {/* Display whether the order is delivered or not */}
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  {/* Add a button to view order details and navigate to the order details page */}
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
