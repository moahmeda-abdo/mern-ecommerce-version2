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

const handleUpdateProdcuts = expressAsyncHandler(async (req, res) => {
  try {
    const { products } = req.body;
    products.forEach(async (productData) => {
      const { productId, quantity } = productData;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedCountInStock = product.countInStock - quantity;
      product.countInStock = updatedCountInStock;
      await product.save();
    });
    res.status(200).json({ message: "Products updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


const handleCategories = expressAsyncHandler(async (req, res) => {
  const categoriess = await Product.distinct("category");
  res.send(categoriess);
});

const handleAllProdcutsForAdmin = expressAsyncHandler(async (req, res) => {
  const products =await Product.find();
  res.send(products);
});

const handleDeleteForAdmin = expressAsyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndRemove(req.params.id);

  if (deletedProduct) {
    res.status(200).json({ message: 'Product deleted successfully' });
    
  } else {
    res.status(404).send({ message: 'Something went Error' });
  }
});

export {
  handleAllProdcuts,
  handleIdProdcuts,
  handleSlugProdcuts,
  handleUpdateProdcuts,
  handleCategories,
  handleAllProdcutsForAdmin,
  handleDeleteForAdmin
};
