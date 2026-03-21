import { Brain, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "ML-Powered Accuracy",
    description:
      "Our models are trained on millions of real transactions to deliver reliable price estimates in seconds.",
  },
  {
    icon: TrendingUp,
    title: "Market Trend Analysis",
    description:
      "Understand neighborhood trends and price trajectories before making your investment decision.",
  },
  {
    icon: Shield,
    title: "Transparent & Trustworthy",
    description:
      "Every prediction comes with confidence intervals and the key factors driving the estimate.",
  },
];

const Features = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance opacity-0 animate-fade-up"
          >
            Why choose PropAI?
          </h2>
          <p
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Built for buyers, sellers, and investors who want data — not opinions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-card rounded-2xl p-8 shadow-sm border border-border/40 hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                <f.icon className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2.5">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
