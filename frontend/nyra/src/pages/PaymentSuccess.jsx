import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const order = state || JSON.parse(localStorage.getItem("lastOrder"))



  if (!order) {
    return <h1>Invalid access</h1>;
  }

  const itemsText = order.items
    ?.map(
      (item, i) =>
        `${i + 1}. ${item.name} | Color: ${item.color} | ₹${item.offer}`
    )
    .join("\n");

  const message = `Hi Nyra Closet, I have completed payment.

Name: ${order.customer?.name}
Phone: ${order.customer?.phone}
Address: ${order.customer?.address}

Order ID: ${order.orderId}
Payment ID: ${order.paymentId}
Amount: ₹${order.amount}

Items:
${itemsText}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-5">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for shopping with Nyra Closet.
        </p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p>Order ID: {order.orderId}</p>
          <p>Payment ID: {order.paymentId}</p>
          <p>Amount Paid: ₹{order.amount}</p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-5 w-full rounded-lg bg-pink-600 py-2 text-white font-bold"
        >
          Continue Shopping
        </button>

        <a
          href={`https://wa.me/919767869083?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full rounded-lg bg-green-500 py-2 text-white font-bold"
        >
          Send Order on WhatsApp
        </a>

        <p className="mt-2 text-gray-600 text-sm">
          Please share your order on WhatsApp to confirm delivery.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

