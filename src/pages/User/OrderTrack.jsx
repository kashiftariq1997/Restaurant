import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrdersByPhone } from "../../Redux/Orders/ordersSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderTracking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }

    try {
      const resultAction = await dispatch(fetchOrdersByPhone(phone));
      if (fetchOrdersByPhone.fulfilled.match(resultAction)) {
        setOrders(resultAction.payload.data); // Set fetched orders
        setShowDropdown(true); // Show dropdown
        if (resultAction.payload.data.length === 0) {
          toast.info("Aucune commande trouvée pour ce numéro.");
        }
      } else {
        toast.error(resultAction.payload || "Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors du suivi de votre commande");
    }
  };

  const handleOrderStatusClick = (order) => {
    navigate("/order-status", { state: { order } }); // Navigate to order status with selected order
  };

  const handleShowAllOrdersClick = () => {
    navigate("/my-orders", { state: { phone } }); // Navigate to MyOrders with phone number
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivi de Commande</h1>
            <p className="text-gray-600">
              Entrez votre numéro de téléphone pour suivre votre commande
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Numéro de téléphone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ex: 77 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f253aa] hover:bg-opacity-90 text-white py-2 rounded-md"
            >
              Suivre ma commande
            </button>
          </form>

          {showDropdown && orders.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Vos Commandes</h2>
              <div className="border border-gray-300 rounded-md shadow-sm">
                {orders.slice(0, 2).map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center px-4 py-2 border-b last:border-none"
                  >
                    <div>
                      <p className="text-sm text-gray-700">Order ID: {order._id}</p>
                      <p className="text-sm text-gray-500">Status: {order.status}</p>
                    </div>
                    <button
                      onClick={() => handleOrderStatusClick(order)}
                      className="text-[#f253aa] hover:underline text-sm font-medium"
                    >
                      Voir le statut
                    </button>
                  </div>
                ))}
              </div>
              {orders.length > 2 && (
                <button
                  onClick={handleShowAllOrdersClick}
                  className="w-full mt-4 bg-[#f253aa] hover:bg-opacity-90 text-white py-2 rounded-md text-sm font-medium"
                >
                  Voir toutes les commandes
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
