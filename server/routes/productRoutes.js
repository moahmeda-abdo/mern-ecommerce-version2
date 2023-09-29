import express from "express";

import {
  handleAllProdcuts,
  handleAllProdcutsForAdmin,
  handleCategories,
  handleCreateProdcutsForAdmin,
  handleDeleteForAdmin,
  handleIdProdcuts,
  handleSlugProdcuts,
  handleUpdateProdcuts,
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../utils/isAuth.js";

const productRouter = express.Router();

productRouter.get("/", handleAllProdcuts);

productRouter.delete("/:id",isAuth, isAdmin, handleDeleteForAdmin);

productRouter.get("/admin",isAuth,isAdmin ,handleAllProdcutsForAdmin);

productRouter.post("/create",isAuth,isAdmin ,handleCreateProdcutsForAdmin);

productRouter.get("/categories", handleCategories);

productRouter.get("/slug/:slug", handleSlugProdcuts);

productRouter.get("/:id", handleIdProdcuts);

productRouter.put("/updateproduct", handleUpdateProdcuts);



export default productRouter;
