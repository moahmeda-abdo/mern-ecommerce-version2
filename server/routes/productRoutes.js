import express from "express";

import {
  handleAllProdcuts,
  handleIdProdcuts,
  handleSlugProdcuts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", handleAllProdcuts);

productRouter.get("/slug/:slug", handleSlugProdcuts);

productRouter.get("/:id", handleIdProdcuts);

export default productRouter;
