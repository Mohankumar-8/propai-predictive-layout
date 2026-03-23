import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "@/components/layout/SectionHeader";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <Features />

      {/* CTA Section */}
      <Section spacing="lg">
        <Container className="text-center">
          <SectionHeader
            title="Ready to know your property's worth?"
            subtitle="Get a data-driven estimate in under 30 seconds. No signup required."
          />
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <Link to="/predict" className="inline-block w-full sm:w-auto">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                Try It Now
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <footer className="border-t border-border/50 py-8 sm:py-10 bg-muted/20">
        <Container>
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © 2026 PropAI. All rights reserved.
          </p>
        </Container>
      </footer>
    </PageLayout>
  );
};

export default Index;
