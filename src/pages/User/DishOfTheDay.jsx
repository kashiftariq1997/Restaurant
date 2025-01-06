import { DishCard } from "./DishCard";

export const DailySpecial = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#f253aa" }}>
        Spécialités du jour
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DishCard
          id="special-1"
          name="Salade César"
          description="Une salade fraîche et croquante avec du poulet grillé, des croûtons et notre sauce César maison."
          price={5500}
          image="/lovable-uploads/8466ceee-b448-4b83-9add-cbf889e7c1b0.png"
          has_extras={true}
        />
      </div>
    </section>
  );
};