import axios from "axios";
import { useContext, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";
import { getError } from "../utils";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false, res: action.paylaod };
    case "CREATE_FAIL":
      return { ...state, loading: false, error: action.paylaod };
    default:
      return state;
  }
};
export default function AdminCreateProduct() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, res }, dispatach] = useReducer(reducer, {
    loading: false,
    error: "",
    response: "",
  });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatach({ type: "CREATE_REQUEST" });
    const imageUrl = await uploadToCloud(image);

    const productData = {
      name,
      slug,
      price,
      category,
      countInStock,
      brand,
      description,
      image: imageUrl,
    };

    try {
      const response = axios.post("/api/products/create", productData, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatach({ type: "CREATE_SUCCESS", paylaod: response });

      toast.success("Product created successfully!");
      setName("");
      setSlug("");
      setPrice("");
      setCategory("");
      setCountInStock("");
      setBrand("");
      setDescription("");
      setImage("");
    } catch (error) {
      dispatach({ type: "CREATE_FAIL", paylaod: getError(error) });
    }
  };

  const uploadToCloud = async (file) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rnl3hvsh");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drleayhps/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Create products</title>
      </Helmet>
      <h1>Create Product</h1>

      <div></div>
      <div>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Brand</Form.Label>
              <Form.Control

                required
                type="text"
                placeholder="Brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Slug"
                onChange={(e) => setSlug(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Price $</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Price $ (numbers only !)"
                onChange={(e) => setSlug(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Count In Stock (numbers only !)"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                placeholder="Product description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Createe
          </Button>

          {loading ? <LoadingBox></LoadingBox> : null}
          {error && <div className="error-message">{error}</div>}
        </Form>
      </div>
    </div>
  );
}
