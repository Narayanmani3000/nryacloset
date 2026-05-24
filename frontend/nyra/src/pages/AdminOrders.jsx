import React, { useEffect, useState } from "react";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://nryacloset.onrender.com/orders");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.log("Fetch orders error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="mb-6 text-3xl font-bold text-pink-700">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-5 shadow-lg"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-bold text-green-600">
                  Paid ✅
                </h2>

                <p className="text-sm text-gray-500">
                  {order.createdAt}
                </p>
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-bold">Customer:</span>{" "}
                  {order.customer?.name}
                </p>

                <p>
                  <span className="font-bold">Phone:</span>{" "}
                  {order.customer?.phone}
                </p>

                <p>
                  <span className="font-bold">Address:</span>{" "}
                  {order.customer?.address}
                </p>

                <p>
                  <span className="font-bold">Amount:</span> ₹
                  {order.amount}
                </p>

                <p>
                  <span className="font-bold">Order ID:</span>{" "}
                  {order.orderId}
                </p>

                <select
  value={order.status}
  onChange={async (e) => {
    const newStatus = e.target.value;

    console.log(order._id)
    await fetch(
      `https://nryacloset.onrender.com/update-order/${order._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o._id === order._id
          ? { ...o, status: newStatus }
          : o
      )
    );
  }}
  className="rounded border px-2 py-1 font-bold"
>
  <option value="Paid">Paid</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>
              </div>

              <div className="mt-4 border-t pt-3">
                <h3 className="mb-2 font-bold">Items:</h3>

                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-600">
                          Color: {item.color}
                        </p>

                        <p className="text-sm text-gray-600">
                          ₹{item.offer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;