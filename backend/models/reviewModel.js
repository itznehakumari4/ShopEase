import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      // to know which admin created which product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // relation between user field and usermodel
    },
  },
  {
    timestamps: true,
  }
);

export default reviewSchema;
