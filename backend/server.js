import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import Order from './models/Order.js'



dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

const app = express();

app.use(cors());

app.use(express.json());

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });

    console.log("Orders from DB:", orders);

    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

app.post("/save-order", async (req, res) => {
  try {
    console.log("Incoming order:", req.body);

    const order = new Order(req.body);

    await order.save();

    console.log("Order saved to MongoDB");

    res.json({
      success: true,
    });
  } catch (error) {
    console.log("SAVE ERROR:", error);

    res.status(500).json({
      success: false,
    });
  }
});

app.put("/update-order/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    console.log(updatedOrder);

    res.json({
      success: true,
      updatedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `nyra_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});