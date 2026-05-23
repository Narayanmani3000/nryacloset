import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import discount from "../util/discountCalculator.js";
import WhatsappMessage from "../util/WhatsappMessage.jsx";


export const ProductDetails = ({data}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = data?.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-xl font-bold text-red-500">Product not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 rounded-lg bg-gray-800 px-4 py-2 text-white"
      >
        ← Back
      </button>

      <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl bg-white p-4 shadow-lg md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-3">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[500px] w-full rounded-xl object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-blue-900">
            {product.name}
          </h1>

          <p className="text-gray-600">
            Beautiful and comfortable outfit from Nyra Closet. Perfect for daily
            wear, casual outings, and gifting.
          </p>

          <div>
            <p className="font-semibold text-gray-800">Color</p>
            <p className="text-gray-600">{product.color}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Available Sizes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.size.map((s, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-300 px-4 py-1 text-sm font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-green-50 p-4">
            <span className="mr-2 text-gray-400 line-through">
              ₹{product.price}
            </span>

            <span className="text-2xl font-bold text-green-600">
              ₹{product.offer}
            </span>

            <span className="ml-2 font-semibold text-orange-500">
              {discount(product.price, product.offer)}% OFF
            </span>
          </div>

          <div className="rounded-xl bg-pink-50 p-4 text-sm text-gray-700">
            <p>✅ Limited stock available</p>
            <p>✅ Order directly on WhatsApp</p>
            <p>✅ Confirm size before placing order</p>
          </div>

          <WhatsappMessage
            itemId={product.id}
            itemName={product.name}
            image={product.image}
            size={product.size}
            color={product.color}
          />
        </div>
      </div>
    </div>
  );
};

// export default ProductDetails;