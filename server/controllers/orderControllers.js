import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const handleOrders = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  const _id = req.user;

  const newOrder = new Order({
    orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    user: _id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: "New Order Created", order });
});


export{handleOrders}