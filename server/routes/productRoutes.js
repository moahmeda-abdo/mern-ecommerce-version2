import express from "express";

import {
  handleAllProdcuts,
  handleIdProdcuts,
  handleSlugProdcuts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", handleAllProdcuts);

productRouter.get("/api/products/slug/:slug", handleSlugProdcuts);

productRouter.get("/:id", handleIdProdcuts);

export default productRouter;
