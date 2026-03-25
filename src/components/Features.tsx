import { memo } from "react";
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

const Features = memo(() => {
  return (
    <Section className="relative">
      {/* Subtle section gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-transparent pointer-events-none" />

      <Container className="relative">
        <SectionHeader
          title="Why choose PropAI?"
          subtitle="Built for buyers, sellers, and investors who want data — not opinions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-7 sm:p-8 border border-border/40 hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/[0.05] hover:-translate-y-1.5 transition-all duration-300 ease-out opacity-0 animate-fade-up cursor-default"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 transition-colors duration-200 group-hover:text-primary">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
});

Features.displayName = "Features";

export default Features;
