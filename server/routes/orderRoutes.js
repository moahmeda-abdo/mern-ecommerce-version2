import express from "express"
import { isAuth } from "../utils/isAuth.js"
import { handleOrders } from "../controllers/orderControllers.js"
const orderRouter = express()



orderRouter.post("/", isAuth , handleOrders)

export default orderRouter