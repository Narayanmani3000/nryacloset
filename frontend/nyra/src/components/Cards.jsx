import React, { useEffect, useState } from "react";
import discount from "../util/discountCalculator.js";
import Image from "../components/ImageReplacement.jsx";
import WhatsappMessage from "../util/WhatsappMessage.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export const Cards = ({ data }) => {
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    setProduct(data || []);
  }, [data]);

  return (
    <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {product.map((da, i) => (
        <div
          key={da.id}
          className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {i + 1}
          </div>

          <Link to={`/product/${da.id}`} className="block">
            <div className="bg-gray-50 p-2">
              <Image url={da.image} name={da.name} />
            </div>

            <h1 className="line-clamp-2 min-h-[40px] px-3 text-center text-sm font-bold text-blue-900 md:text-base">
              {da.name}
            </h1>
          </Link>

          <div className="space-y-2 p-3">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Color:</span>{" "}
              {da.color}
            </p>

            <div className="flex flex-wrap gap-1 text-xs">
              <span className="font-semibold text-gray-800">Size:</span>
              {da.size.map((s, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-300 px-2 py-0.5 text-gray-700"
                >
                  {s}
                </span>
              ))}
            </div>

            <div>
              <span className="mr-2 text-xs text-gray-400 line-through">
                ₹{da.price}
              </span>

              <span className="text-base font-bold text-green-600">
                ₹{da.offer}
              </span>

              <span className="ml-1 text-xs font-semibold text-orange-500">
                {discount(da.price, da.offer)}% OFF
              </span>
            </div>

            <button
  onClick={() => {
    addToCart(da);
    navigate("/cart");
  }}
  className="mt-2 w-full rounded-lg bg-pink-600 py-2 text-sm font-bold text-white hover:bg-pink-700"
>
  Add to Cart
</button>

            <WhatsappMessage
              itemId={da.id}
              itemName={da.name}
              image={da.image}
              size={da.size}
              color={da.color}
            />
          </div>
        </div>
      ))}
    </div>
  );
};