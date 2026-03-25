import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";

const Hero = memo(() => {
  return (
    <section className="relative overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-primary/[0.06] blur-[80px] pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-[10%] w-96 h-96 rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none animate-float" style={{ animationDelay: "3s" }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative py-24 sm:py-32 md:py-40 lg:py-48">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="flex flex-col gap-7 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-1.5 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-[11px] sm:text-xs font-semibold tracking-wider uppercase opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Estimates
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "80ms", lineHeight: "1.08" }}
            >
              Predict Property Prices{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Instantly
              </span>
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

          {/* Illustration */}
          <div
            className="hidden sm:flex justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-2xl pointer-events-none" />
              <img
                src="/hero-illustration.png"
                alt="AI property price prediction visualization"
                className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md drop-shadow-xl hover:drop-shadow-2xl transition-[filter] duration-500 animate-float"
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
