import { Clock, ChefHat, Award } from "lucide-react";
// import DishOfTheDay from "../../assets/images/dishoftheday.png";

const Offers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-[400px]">
            <img
                src='../../assets/images/dishoftheday.png'
                alt="Thiéboudienne Royal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">Thiéboudienne Royal</h1>
                  <p className="text-lg opacity-90">Plat du Jour</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Le plat national sénégalais par excellence. Riz au poisson préparé avec
                    des légumes frais, garni de sauce tomate et accompagné de légumes
                    de saison.
                  </p>

                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">Chef Aminata Sow</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">25-30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#f253aa]" />
                      <span className="text-gray-600">Spécialité du Chef</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#f253aa] mb-2">
                      5 000 XOF
                    </div>
                    <p className="text-gray-500">Prix spécial du jour</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full h-12 bg-[#f253aa] hover:bg-[#f253aa]/90 text-white">
                      Commander Maintenant
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Disponible aujourd'hui jusqu'à 22h
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
