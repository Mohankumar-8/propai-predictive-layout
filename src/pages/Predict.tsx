import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";

const Predict = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance text-center opacity-0 animate-fade-up"
        >
          Price Prediction
        </h1>
        <p
          className="mt-3 sm:mt-4 text-muted-foreground text-center text-base sm:text-lg mb-8 sm:mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          Enter property details below to get an instant AI-powered estimate.
        </p>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <PredictionForm />
        </div>
      </section>
    </div>
  );
};

export default Predict;
