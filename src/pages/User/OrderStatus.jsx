import React from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const OrderStatusEnum = {
  PENDING: 0,
  APPROVED: 1,
  PREPARING: 2,
  DELIVERING: 3,
  DELIVERED: 4,
};

export const statusStringToEnum = {
  Pending: OrderStatusEnum.PENDING,
  Approved: OrderStatusEnum.APPROVED,
  Preparing: OrderStatusEnum.PREPARING,
  Delivering: OrderStatusEnum.DELIVERING,
  Delivered: OrderStatusEnum.DELIVERED,
};

const OrderStatus = () => {
  const location = useLocation();
  const { order } = location.state || {};

  const status = order?.status
    ? statusStringToEnum[order.status] || OrderStatusEnum.PENDING
    : OrderStatusEnum.PENDING;

  const formatPrice = (price) => `${price.toFixed(2)} XOF`;

  const orderDetails = {
    subtotal: order?.items?.reduce((total, item) => {
      const sizePrice = item.selectedSize?.price || item.price || 0;
      const extrasPrice = (item.selectedExtras || []).reduce(
        (sum, extra) => sum + (extra.price || 0),
        0
      );
      return total + (sizePrice + extrasPrice) * (item.quantity || 1);
    }, 0) || 0,
    deliveryFee: 150,
  };
  const total = orderDetails.subtotal + orderDetails.deliveryFee;

  const statusLabels = [
    "Pending",
    "Approved",
    "Preparing",
    "Delivering",
    "Delivered",
  ];

  const circleClasses = (level) => {
    if (status === level) {
      // Apply "border-spin" for pending, preparing, or delivering statuses
      if (
        level === OrderStatusEnum.PENDING ||
        level === OrderStatusEnum.PREPARING ||
        level === OrderStatusEnum.DELIVERING
      ) {
        return "border-spin"; // Animated spinning border
      }
      return "border-blue-500"; // Solid blue for other current statuses
    }
    return status > level ? "border-blue-500" : "border-gray-300"; // Blue for past, gray for future
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Order Status</h1>
          <p className="text-xl font-semibold">Total Amount: {formatPrice(total)}</p>
          {order?.created_at && (
            <p className="text-sm text-gray-600">
              Ordered on{" "}
              {format(new Date(order.created_at), "dd MMMM yyyy 'at' HH:mm", { locale: fr })}
            </p>
          )}
        </div>

        <div className="relative mb-6 flex justify-center items-center h-64">
  {statusLabels.map((label, index) => {
    const level = OrderStatusEnum[label.toUpperCase()];

    return (
      <div
        key={label}
        className="absolute flex justify-center items-center"
        style={{
          width: `${120 + index * 40}px`,
          height: `${120 + index * 40}px`,
        }}
      >
        {/* Spinning border */}
        <div
          className={`rounded-full ${circleClasses(level)}`}
          style={{
            width: `${120 + index * 40}px`,
            height: `${120 + index * 40}px`,
          }}
        ></div>

        {/* Label */}
        {status === level && (
          <div className="absolute flex items-center justify-center text-sm font-semibold text-[#8B5CF6] z-[100]">
            {label}
          </div>
        )}
      </div>
    );
  })}
</div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          {order?.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                {item.selectedSize && (
                  <p className="text-sm text-gray-600">Size: {item.selectedSize.size}</p>
                )}
                {item.selectedExtras && item.selectedExtras.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Extras: {item.selectedExtras.map((extra) => extra.name).join(", ")}
                  </p>
                )}
              </div>
              <p className="font-medium">
                {formatPrice(
                  (item.selectedSize?.price || item.price || 0) +
                  (item.selectedExtras?.reduce((sum, extra) => sum + (extra.price || 0), 0) || 0)
                )}
              </p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">{formatPrice(orderDetails.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
