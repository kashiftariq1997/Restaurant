import { Clock, ChefHat, Award } from "lucide-react";
import { useState } from "react";
import dishOfTheDay1 from "../../assets/images/dishoftheday1.jpeg";
import dishOfTheDay2 from "../../assets/images/dishoftheday2.jpeg";
import dishOfTheDay3 from "../../assets/images/dishoftheday3.jpeg";

// Dummy Data for Dishes
const dishes = [
  {
    id: 1,
    name: "Thiéboudienne Royal",
    description:
      "Le plat national sénégalais par excellence. Riz au poisson préparé avec des légumes frais, garni de sauce tomate et accompagné de légumes de saison.",
    chef: "Chef Aminata Sow",
    time: "25-30 minutes",
    specialty: "Spécialité du Chef",
    price: "5 000 XOF",
    availableUntil: "22h",
    image: dishOfTheDay1,
  },
  {
    id: 2,
    name: "Poulet Yassa",
    description:
      "Poulet mariné avec des oignons et du citron, servi avec du riz parfumé et une sauce onctueuse.",
    chef: "Chef Alassane Diallo",
    time: "20-25 minutes",
    specialty: "Favori des Clients",
    price: "4 500 XOF",
    availableUntil: "22h",
    image: dishOfTheDay2,
  },
  {
    id: 3,
    name: "Mafé de Bœuf",
    description:
      "Un ragoût de bœuf aux arachides, accompagné de riz blanc et de légumes frais.",
    chef: "Chef Mariama Ndiaye",
    time: "30-35 minutes",
    specialty: "Plat Réconfortant",
    price: "6 000 XOF",
    availableUntil: "22h",
    image: dishOfTheDay3,
  },
];

const Offers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  const currentDish = dishes[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-[400px]">
              <img
                src={currentDish.image}
                alt={currentDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{currentDish.name}</h1>
                  <p className="text-lg opacity-90">Plat du Jour</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                &rarr;
              </button>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {currentDish.description}
                  </p>

                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">{currentDish.chef}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">{currentDish.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">
                        {currentDish.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#f253aa] mb-2">
                      {currentDish.price}
                    </div>
                    <p className="text-gray-500">Prix spécial du jour</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full h-12 bg-[#f253aa] hover:bg-[#f253aa]/90 text-white">
                      Commander Maintenant
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Disponible aujourd'hui jusqu'à {currentDish.availableUntil}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offers;
