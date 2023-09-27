import express from "express"
import { isAdmin, isAuth } from "../utils/isAuth.js"
import {
  handleIdOrders,
  handleOrders,
  handleSummary,
  handleUserOrders,
} from "../controllers/orderControllers.js";


const orderRouter = express();

orderRouter.post("/", isAuth ,handleOrders);
orderRouter.get("/summary" , isAuth , isAdmin , handleSummary)
orderRouter.get("/orderhistory",isAuth,  handleUserOrders);
orderRouter.get("/:id",isAuth, handleIdOrders);
export default orderRouter