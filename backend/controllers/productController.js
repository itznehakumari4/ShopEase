// @controller module to control the routes

import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc        Fetch all products/or products with the keyword prefix
// @route       GET /api/products?keyword=${prefixWord}
// @access      Public (Anyone can access this domain)
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT; // contents per page

  // getting the page number from url using query
  const page = Number(req.query.pageNumber) || 1; // Current Page, If pageNumber is not provided in the query, it defaults to 1, indicating the first page.

  // query searches for ? in url
  const keyword = req.query.keyword //The req.query object in Express.js represents the query parameters in the URL. Query parameters are the parts of the URL that come after the question mark (?), and they are typically used to pass data to the server.
    ? {
        name: { //products name in database
          $regex: `^${req.query.keyword}`, // only match with the prefix result
          $options: "i", //it means that searching is case insensitive
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword }); // count products returned as per prefix keyword, or, all

  const products = await Product.find({ ...keyword }) //Passing a copy of the keyword object ensures that any further modifications or manipulations made to the query condition object (e.g., by other parts of the code) do not affect the original keyword object. It helps maintain the integrity of the original object, which might be used in other parts of the code.
    .limit(pageSize) //it limits the number of products to be display
    .skip(pageSize * (page - 1)); // return product as per prefix keyword,or, all.. {{{==>>DND<<==}}}

  if (products) {
    res.send({ products, page, pages: Math.ceil(count / pageSize) }); // pages-> total pages to show
  } else {
    res.status(404);
    throw new Error("Please reload!");
  }
});

// @desc        Fetch single products, clicked ones
// @route       GET /api/products/:id
// @access      Public (Anyone can access this domain)
//  In the context of MongoDB and Mongoose, ObjectId refers to a specific data type used for unique identifiers of documents within a collection.It is a 12 - byte identifier typically represented as a 24 - character hexadecimal string
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // if there is a product
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  if(products){
    res.send(products);
  }
  else{
    res.status(404);
    throw new Error('Products not found');
  }
});

/****************************************ADMIN ACCESS********************************* */

// @desc        Delete Product by Admin
// @route       DELETE /api/products/delete/:ProductID
// @access      Private (Only Admins can access this domain)
const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const Deletedproduct = await Product.findByIdAndDelete(req.params.id);
  if (Deletedproduct) {
    res.send({ message: "Product deleted!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc        Create Product by Admin
// @route       POST /api/products
// @access      Private (Only Admins can access this domain)
const createProductByAdmin = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/samples.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201); //201 status code means a new resource has been successfully created
  res.send(createdProduct);
});

// @desc        Update Product by Admin
// @route       PUT /api/products/:productId
// @access      Private (Only Admins can access this domain)
const updateProductByAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201);
    res.send(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc        Create new Review
// @route       PUT /api/products/:productId/reviews
// @access      Private (Only Admins can access this domain)
// Future prospects:- Only customers who got the product delivered can review, i.e. review after product delivery
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // checking if the customer already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (eachUser) => eachUser.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400); //400 status code means bad request
      throw new Error("Product Already Reviewed!");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce(
          (acc, eachReview) => eachReview.rating + acc, //calculating average after taking new rating into consideration
          0
        ) / product.reviews.length;
      await product.save();
      res.status(201);
      res.send({ message: "Review added successfully!" });
    }
  } else {
    res.status(400);
    throw new Error("Product Not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
  createReview,
  getTopProducts,
};
