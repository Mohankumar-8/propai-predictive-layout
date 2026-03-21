import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";

const Predict = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance text-center opacity-0 animate-fade-up"
        >
          Price Prediction
        </h1>
        <p
          className="mt-4 text-muted-foreground text-center text-lg mb-12 opacity-0 animate-fade-up"
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
