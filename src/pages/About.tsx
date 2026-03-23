import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "@/components/layout/SectionHeader";
import { Target, BarChart3, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", text: "Models trained on millions of real-world transactions." },
  { icon: BarChart3, title: "Transparency", text: "Every prediction includes confidence intervals and key factors." },
  { icon: Users, title: "Accessibility", text: "Free, instant estimates — no signup or hidden fees." },
];

const About = () => {
  return (
    <PageLayout gradient>
      <Section spacing="lg">
        <Container size="md">
          <SectionHeader
            title="About PropAI"
          />
          <div
            className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12 sm:mt-16">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group text-center bg-card rounded-2xl p-6 border border-border/40 shadow-sm hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 opacity-0 animate-fade-up cursor-default"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className="mx-auto w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm sm:text-base transition-colors duration-200 group-hover:text-primary">{v.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default About;
