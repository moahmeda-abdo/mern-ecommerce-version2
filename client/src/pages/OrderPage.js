import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "./Store";
import axios from "axios";
import { getError } from "../utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Define a reducer function to manage component state based on actions
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderPage() {
  // Get global state from the context
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Get the navigate function to programmatically navigate to other pages
  const navigate = useNavigate();

  // Get the order ID from the URL parameters
  const params = useParams();
  const { id: orderId } = params;

  // Initialize component state using the reducer
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    // Fetch order details when the component mounts or when userInfo, orderId, or order state changes
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `/api/orders/${orderId}`,
          {
            // Include the user's authorization token in the request headers
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        // Handle fetch error and update component state
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    // Check if the user is logged in; if not, navigate to the login page
    if (!userInfo) {
      navigate("/login");
    }

    // If the order ID is not available or doesn't match the current order, fetch the order details
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    // Display a loading spinner while fetching data
    <LoadingBox></LoadingBox>
  ) : error ? (
    // Display an error message if data fetching fails
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="main-haeding my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                // Display a success message if the order is delivered
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                // Display a danger message if the order is not delivered
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                // Display a success message if the order is paid
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                // Display a danger message if the order is not paid
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
