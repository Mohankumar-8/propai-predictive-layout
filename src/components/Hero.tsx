import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span
              className="inline-block self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              AI-Powered Estimates
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              Predict Property Prices{" "}
              <span className="text-primary">Instantly</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 opacity-0 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              Get accurate, data-driven housing price estimations powered by
              machine learning — no guesswork, just numbers you can trust.
            </p>
            <div
              className="flex flex-wrap gap-3 justify-center lg:justify-start opacity-0 animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link to="/predict">
                <Button variant="hero" size="lg">
                  Start Prediction
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div
            className="hidden lg:flex justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <img
              src={heroIllustration}
              alt="AI property price prediction visualization"
              className="w-full max-w-md drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
