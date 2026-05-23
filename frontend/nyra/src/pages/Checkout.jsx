import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      if (!customer.name || !customer.phone || !customer.address) {
        alert("Please fill name, phone and address");
        return;
      }

      if (!totalAmount || totalAmount <= 0) {
        alert("Cart is empty");
        return;
      }

      const loaded = await loadRazorpayScript();

      if (!loaded) {
        alert("Razorpay failed to load");
        return;
      }

      const orderResponse = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await orderResponse.json();

      console.log("Order from backend:", order);

      if (!order.id) {
        alert("Order creation failed. Check backend terminal.");
        return;
      }

      const options = {
        key: "rzp_test_Sr9g9d0DMzltBV",
        amount: order.amount,
        currency: "INR",
        name: "Nyra Closet",
        description: "Clothing Order",
        order_id: order.id,

        method: {
          card: true,
          netbanking: true,
          upi: false,
          wallet: false,
          emi: false,
          paylater: false,
        },

        prefill: {
          name: customer.name,
          contact: customer.phone,
        },

        theme: {
          color: "#db2777",
        },

        handler: async function (response) {
          console.log("Payment response:", response);

          const verifyResponse = await fetch(
            "http://localhost:5000/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const result = await verifyResponse.json();
          console.log("Verify result:", result);

          if (result.success) {
            const orderData = {
              customer,
              items: cart,
              amount: totalAmount,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              status: "Paid",
              createdAt: new Date().toLocaleString(),
            };

            const existingOrders =
                JSON.parse(localStorage.getItem("orders")) || [];

                existingOrders.push(orderData);

                localStorage.setItem("orders", JSON.stringify(existingOrders));

                localStorage.setItem("lastOrder", JSON.stringify(orderData));
                
                
                await fetch("http://localhost:5000/save-order",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
                  },
                  body:JSON.stringify(orderData)
                })
                
                clearCart();
            navigate("/payment-success", {
              state: orderData,
            });
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        console.log("Payment failed:", response.error);
        alert(response.error.description);
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-5 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-pink-700">Checkout</h1>

        <p>Total Items: {cart.length}</p>
        <p className="mt-2 text-xl font-bold">Pay: ₹{totalAmount}</p>

        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            className="w-full rounded-lg border p-3"
          />

          <textarea
            placeholder="Delivery Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          onClick={handlePayment}
          className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-bold text-white"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;