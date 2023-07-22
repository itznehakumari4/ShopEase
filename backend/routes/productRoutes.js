/*{
    The code router.route('/').get(getProducts) is used to define a route handler for a specific HTTP method and path in a server application.
    Let's break it down:
        1) router: This refers to an instance of a router object, which is typically provided by a framework like Express
                   js.The router object allows you to define routes and their corresponding handlers.

        2) route('/'): This sets up a route for a specific path, in this case, the root path("/").You can specify any
                       desired path here, such as "/users" or "/products", depending on your application's needs.

        3) .get(getProducts): This specifies that the route handler should be triggered when an HTTP GET request is made
                              to the specified path.It associates the getProducts function as the handler for the GET method on that path.

        4)  getProducts: This is the handler function that will be called when a GET request is made to the specified
                         path.It contains the logic to handle the request and send a response back to the client.
}*/

import express from "express";
import {
  createProductByAdmin,
  createReview,
  deleteProductByAdmin,
  getProductById,
  getProducts,
  updateProductByAdmin,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").put(protect, createReview);
router.route("/:id").get(getProductById);

/***********************ADMIN ACCESS********************************* */

router.route("/delete/:id").delete(protect, isAdmin, deleteProductByAdmin);
router.route("/").post(protect, isAdmin, createProductByAdmin);
router.route("/:id").put(protect, isAdmin, updateProductByAdmin);

export default router;
