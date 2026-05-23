import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
  cart,
  totalAmount,
  increaseQuantity,
  decreaseQuantity,
} = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-xl font-bold">Your cart is empty</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold text-pink-700">My Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-xl bg-white p-3 shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-28 w-24 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h2 className="font-bold text-blue-900">{item.name}</h2>
              <p className="text-sm text-gray-600">Color: {item.color}</p>
              <p className="text-sm text-gray-600">
                Size: {item.size?.join(", ")}
              </p>

              <p className="font-bold text-green-600">
  ₹{item.offer * item.quantity}
</p>
              <div className="mt-2 flex items-center gap-3">
  <button
    onClick={() => decreaseQuantity(item.id)}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl font-bold"
  >
    -
  </button>

  <span className="text-lg font-bold">
    {item.quantity}
  </span>

  <button
    onClick={() => increaseQuantity(item.id)}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white"
  >
    +
  </button>
</div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold">Total: ₹{totalAmount}</h2>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full rounded-lg bg-green-600 py-3 font-bold text-white"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;