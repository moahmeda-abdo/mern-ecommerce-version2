import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import cors from "cors"
const app = express();

dotenv.config();


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
