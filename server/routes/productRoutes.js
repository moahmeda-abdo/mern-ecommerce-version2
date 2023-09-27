import express from "express";

import {
  handleAllProdcuts,
  handleCategories,
  handleIdProdcuts,
  handleSlugProdcuts,
  handleUpdateProdcuts,
} from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/", handleAllProdcuts);
productRouter.get("/categories", handleCategories);

productRouter.get("/slug/:slug", handleSlugProdcuts);

productRouter.get("/:id", handleIdProdcuts);

productRouter.put("/updateproduct", handleUpdateProdcuts);



export default productRouter;
