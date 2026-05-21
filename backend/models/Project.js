const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    projectName: {
      type: String,
      required: true,
    },
    requestDetails: {
      type: String,
      required: true,
    },
    investmentAmount: {
      type: Number,
      default: 0,
    },
    projectStatus: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
