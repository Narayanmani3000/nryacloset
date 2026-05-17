import React, { useEffect, useState } from 'react'

export const Hero = () => {
const [index, setIndex]=useState(0);
  const [animate, setAnimate] = useState(true);

  
    const slogans = [
  "New Styles Just Dropped ✨",
  "Kurti Sets Starting ₹299",
  "Limited Stock — Order Fast",
  "Trendy Looks for Every Day"
];


    useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slogans.length);
        setAnimate(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-hidden h-10 flex items-center justify-center bg-pink-100 rounded-lg">
      <h2
        className={`text-pink-700 font-bold text-lg transition-all duration-300
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        {slogans[index]}
      </h2>
    </div>
  )
}
