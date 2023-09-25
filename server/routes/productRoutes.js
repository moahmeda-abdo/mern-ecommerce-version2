import express from "express";

import {
  handleAllProdcuts,
  handleCategories,
  handleIdProdcuts,
  handleSlugProdcuts,
  handleUpdateProdcuts,
} from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", handleAllProdcuts);

productRouter.get("/slug/:slug", handleSlugProdcuts);

productRouter.get("/:id", handleIdProdcuts);

productRouter.put("/updateproduct", handleUpdateProdcuts);

// productRouter.get(
//   "/categories",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Product.find()
//     res.send(categories);
//   })
// );


export default productRouter;
