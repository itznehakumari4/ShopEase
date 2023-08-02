import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
//The asyncHandler function is a middleware that takes an asynchronous route handler as an argument and returns a new route handler that automatically handles any errors that might occur during the execution of the asynchronous function.

// @desc        Create new order
// @route       POST /api/orders
// @access      Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems, // this is any array of order Items
    shippingAddress,
    paymentGateway,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No products in order!");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // getting this from protect middleware after token verification
      shippingAddress,
      paymentGateway,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save(); //the order object is saved to mongodb database

    res.status(201);
    res.send(createdOrder); //send the createdOrder response to client
  }
});

// @desc        Get order by ID
// @route       GET /api/order/:Orderid
// @access      Private
const getOrderById = asyncHandler(async (req, res) => {
  /*
   * Populates the referenced field(s) in the document with the actual data from another collection.
   *
   * @param {String} path - The field to populate.
   * @param {String|Object} [select] - Optional. The fields to include or exclude from the populated document(s).
   * @returns {Query} The query object with the populated field(s).
   *
   * Example usage:
   * const order = await Order.findById(req.params.id).populate('user', 'name email');
   *
   * This populates the 'user' field of the order document with the associated user document,
   * including only the 'name' and 'email' fields. Writing only 'user' will result in all of the user schema members
   *
   * Multiple fields can be populated by chaining multiple `populate()` calls.
   * The referenced field(s) must have a reference defined in the schema.
   */

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.send(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc        Update order to Paid
// @route       PUT /api/order/:Orderid/pay_status
// @access      Private
const updateOrderPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",     //the populate method is used to populate the user field of the order document with the associated user's data. Specifically, it populates the user field with the name and email fields of the associated user. This allows the response to include not only the order details but also the name and email of the user who placed the order.
    "name email"
  );
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      // this is being secured from payStatus order actions
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address, // payer from paypal
    };

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// ----------------------------ADMIN ACCESS------------------------

// @desc        Get orders by admins
// @route       PUT /api/orders
// @access      Private (ONLY ADMINS)
const getOrders_ADMINS_ONLY = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "_id name"); //The populate method is used to populate the user field of each order document with the associated user's _id and name fields. This ensures that the response includes not only the order details but also the name and _id of the user who placed the order.
  if (orders) {
    res.send(orders);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc        Update order as delivered by admins
// @route       PUT /api/order/:Orderid/delivery_status
// @access      Private
const updateOrderDelivery_ADMINS_ONLY = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id); //params means taking id from url only sent in client side
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now(); 
    await order.save();
    res.send({ message: "Delivered!!!" });
    res.status(200);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderPaid,
  getOrders_ADMINS_ONLY,
  updateOrderDelivery_ADMINS_ONLY,
};
