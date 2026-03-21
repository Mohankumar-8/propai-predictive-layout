import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance opacity-0 animate-fade-up"
          >
            Ready to know your property's worth?
          </h2>
          <p
            className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Get a data-driven estimate in under 30 seconds. No signup required.
          </p>
          <div
            className="mt-6 sm:mt-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <Link to="/predict" className="inline-block w-full sm:w-auto">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                Try It Now
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 sm:py-10 bg-muted/20">
        <p className="text-center text-xs sm:text-sm text-muted-foreground px-4">
          © 2026 PropAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
