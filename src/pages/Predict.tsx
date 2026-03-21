import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Predict = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance text-center">
          Price Prediction
        </h1>
        <p className="mt-4 text-muted-foreground text-center text-lg">
          Enter property details below to get an instant AI-powered estimate.
        </p>

        <div className="mt-12 bg-card rounded-xl border border-border/40 shadow-sm p-8 space-y-6">
          {["Location", "Square Footage", "Bedrooms", "Year Built"].map((label) => (
            <div key={label}>
              <label className="block text-sm font-medium text-foreground mb-2">
                {label}
              </label>
              <input
                type="text"
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
          ))}
          <Button className="w-full" size="lg">
            Predict Price
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Predict;
