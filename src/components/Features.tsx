import { Brain, TrendingUp, Shield } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "@/components/layout/SectionHeader";

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
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader
          title="Why choose PropAI?"
          subtitle="Built for buyers, sellers, and investors who want data — not opinions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border/40 hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Features;
