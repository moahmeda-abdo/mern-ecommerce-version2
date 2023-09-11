import express from "express";

import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";

import productRouter from "./routes/productRoutes.js";
import seedRouter from "./routes/seedRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
