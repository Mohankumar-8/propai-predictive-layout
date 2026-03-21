import Navbar from "@/components/Navbar";
import { Target, BarChart3, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", text: "Models trained on millions of real-world transactions." },
  { icon: BarChart3, title: "Transparency", text: "Every prediction includes confidence intervals and key factors." },
  { icon: Users, title: "Accessibility", text: "Free, instant estimates — no signup or hidden fees." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance text-center opacity-0 animate-fade-up"
        >
          About PropAI
        </h1>
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="text-center bg-card rounded-2xl p-5 sm:p-6 border border-border/40 shadow-sm opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="mx-auto w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <v.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5 text-sm sm:text-base">{v.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
