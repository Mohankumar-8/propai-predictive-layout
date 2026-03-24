import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";

const Hero = memo(() => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-primary/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />

      <Container className="relative py-20 sm:py-28 md:py-36 lg:py-44">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-1.5 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold tracking-wide uppercase opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Estimates
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "80ms", lineHeight: "1.1" }}
            >
              Predict Property Prices{" "}
              <span className="text-primary">Instantly</span>
            </h1>
            <p
              className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              Get accurate, data-driven housing price estimations powered by
              machine learning — no guesswork, just numbers you can trust.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start opacity-0 animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link to="/predict" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Start Prediction
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration — visible on tablet+ */}
          <div
            className="hidden sm:flex justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <img
              src="/hero-illustration.png"
              alt="AI property price prediction visualization"
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md drop-shadow-xl hover:drop-shadow-2xl transition-[filter] duration-500"
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
            />
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
