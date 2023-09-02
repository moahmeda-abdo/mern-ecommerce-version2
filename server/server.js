import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("connected to db");
})
.catch((error)=>{
console.log(error.message)
});

 
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((X) => X.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
    console.log("product sent");
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
