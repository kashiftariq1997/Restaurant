import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTracking = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }
    navigate("/order-status");
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
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
