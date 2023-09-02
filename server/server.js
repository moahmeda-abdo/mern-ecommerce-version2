import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import Product from './models/productModel.js';
import productRouter from "./routes/productRoutes.js";

const app = express();

dotenv.config();

mongoose
.connect(process.env.MONGO_URI) 
.then(() => {
  console.log("connected to mongoo");
})
.catch((err) => {
  console.log(err.message);  
});

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, 
}; 
app.use(cors(corsOptions));



app.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});
 

app.use("/api/products", productRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
