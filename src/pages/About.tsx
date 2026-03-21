import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance text-center">
          About PropAI
        </h1>
        <div className="mt-8 space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            PropAI leverages state-of-the-art machine learning models trained on
            millions of property transactions to deliver instant, accurate price
            estimations for residential real estate.
          </p>
          <p>
            Whether you're a first-time buyer exploring the market, a seller
            pricing your home, or an investor evaluating opportunities — PropAI
            gives you the data-driven confidence to make smarter decisions.
          </p>
          <p>
            Our models analyze dozens of features including location, size,
            condition, market trends, and comparable sales to generate
            predictions with transparent confidence intervals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
