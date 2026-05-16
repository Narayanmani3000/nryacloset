import React, { useEffect, useState } from "react";
import discount from "../util/discountCalculator.js";
import Image from "../components/ImageReplacement.jsx";
import  WhatsappMessage  from "../util/WhatsappMessage.jsx";

export const Cards = ({ data }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(data || []);
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setProduct(data || []);
      return;
    }

    const searchPro = (data || []).filter((p) =>
      p.name.toLowerCase().includes(value)
    );

    setProduct(searchPro || searchSize);
  };


  const clickSearch = (e)=>{
    const value = e.target.value;
     const searchSize = (data || []).filter((p) =>
    p.size.some((a) => a.toLowerCase() === value.toLowerCase())
  );
    setProduct(searchSize || [])
  }
  return (
    <>
      <input
        type="text"
        placeholder="Search product..."
        onChange={handleSearch}
        className="border border-gray-400 p-2 m-4 rounded w-[90%]"
      />
      <div className="flex w-full justify-evenly">

      <button value="M" onClick={clickSearch} className="border border-gray-500 px-4">M</button>
      <button value="L" onClick={clickSearch}  className="border border-gray-500 p-3">L</button>
      <button value="XL" onClick={clickSearch}  className="border border-gray-500 p-3">XL</button>
      <button value="XXL" onClick={clickSearch}  className="border border-gray-500 p-3">XXL</button>
     
      </div>
      <div className="grid grid-cols-2">
        {product.map((da, i) => {
          return (
            <div
              key={da.id}
              className="items-center p-5 m-4 border border-gray-600"
            >
              <div className="size-5 flex justify-center items-center bg-blue-600 text-white rounded-full">
                {i + 1}
              </div>

              <Image url={da.image} />

              <h1 className="font-bold text-center text-blue-900">
                {da.name}
              </h1>

              <p>Color : {da.color}</p>

              <p>
                Size:{" "}
                {da.size.map((s, index) => (
                  <span key={index}>{s} </span>
                ))}
              </p>

              <p>
                <span className="line-through text-gray-400 block">
                  Rs. {da.price}
                </span>
                <span className="text-green-600 font-bold mr-2">
                  Rs. {da.offer}
                </span>
                <span className="text-gray-600 font-semibold">
                  ({discount(da.price, da.offer)}% Off)
                </span>
                <span>
                <WhatsappMessage
                itemId={da.id}
                itemName={da.name}
                image={da.image}
                size={da.size}
                color={da.color}
                />
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};