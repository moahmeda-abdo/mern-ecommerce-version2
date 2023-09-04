import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const handleAllProdcuts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const handleSlugProdcuts = expressAsyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const handleIdProdcuts = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export { handleAllProdcuts, handleIdProdcuts, handleSlugProdcuts };
