import express from "express"
import { isAuth } from "../utils/isAuth.js"
import {
  handleIdOrders,
  handleOrders,
  handleUserOrders,
} from "../controllers/orderControllers.js";


const orderRouter = express();

orderRouter.post("/", isAuth ,handleOrders);
orderRouter.get("/orderhistory",isAuth,  handleUserOrders);
orderRouter.get("/:id",isAuth, handleIdOrders);
export default orderRouter