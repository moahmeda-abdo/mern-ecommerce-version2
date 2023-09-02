import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const handleAllProdcuts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const handleSlugProdcuts = asyncHandler(async (req, res) => {
  const product = await Product.findOne((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

const handleIdProdcuts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
    console.log("product sent");
  }
});

export { handleAllProdcuts, handleIdProdcuts, handleSlugProdcuts };
