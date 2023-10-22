import React, { useContext, useEffect, useReducer } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import logger from "use-reducer-logger";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Store } from "./Store";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Component for the dashboard screen
export default function DashboardScreen() {
  // UseReducer to manage loading, error, and response states
  const [{ loading, summary, error }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Fetch summary data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://main--playful-phoenix-2280d5.netlify.app/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });

      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Row>
        <h1 className="main-haeding  my-3">Dashboard</h1>

        <div className="my-2">
          <Link to="/admin/products">
            <Button className="me-2">Manage Products</Button>
          </Link>
          <Link to="/admin/products/create">
            <Button className="m-2">Create Products</Button>
          </Link>
          <Link to="/admin/orders">
            <Button className="m-2">Manage Orders</Button>
          </Link>
          <Link to="/admin/users">
            <Button className="m-2">Manage Users</Button>
          </Link>
        </div>
      </Row>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    $
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </Card.Title>
                  <Card.Text> Total Sales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {summary.dailyOrders && summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Date", "Sales"],
                  ...(summary.dailyOrders || []).map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {summary.productCategories &&
            summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Category", "Products"],
                  ...(summary.productCategories || []).map((x) => [
                    x._id,
                    x.count,
                  ]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
