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

const handleIdOrders = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const handleUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  console.log(req.user)
  res.send(orders);
});
export { handleOrders, handleIdOrders, handleUserOrders };