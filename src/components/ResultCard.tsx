import { useEffect, useRef, useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  Ruler,
  CheckCircle2,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  estimatedPrice: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  area: number;
}

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/** Animates a number from 0 to `target` over `duration` ms. */
const useCountUp = (target: number, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
};

const ResultCard = ({
  estimatedPrice,
  priceRangeLow,
  priceRangeHigh,
  area,
}: ResultCardProps) => {
  const pricePerSqFt = Math.round(estimatedPrice / area);

  const animatedPrice = useCountUp(estimatedPrice, 1400, 400);
  const animatedLow = useCountUp(priceRangeLow, 1000, 600);
  const animatedHigh = useCountUp(priceRangeHigh, 1000, 600);
  const animatedPsf = useCountUp(pricePerSqFt, 1000, 700);

  // Confidence based on range tightness
  const rangeSpread = ((priceRangeHigh - priceRangeLow) / estimatedPrice) * 100;
  const confidence =
    rangeSpread < 10
      ? { label: "High accuracy", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" }
      : rangeSpread < 20
        ? { label: "Good accuracy", color: "text-primary", bg: "bg-primary/10" }
        : { label: "Moderate accuracy", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" };

  return (
    <Card className="opacity-0 animate-scale-in overflow-hidden border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Gradient accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 animate-shimmer bg-[length:200%_100%]" />

      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Top badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold opacity-0 animate-slide-in-right"
            style={{ animationDelay: "200ms" }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 animate-bounce-subtle" />
            Prediction Complete
          </div>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${confidence.bg} ${confidence.color} text-xs font-semibold opacity-0 animate-slide-in-right`}
            style={{ animationDelay: "350ms" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {confidence.label}
          </div>
        </div>

        {/* Estimated Price — hero section */}
        <div
          className="rounded-xl bg-primary/5 border border-primary/10 p-5 sm:p-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <IndianRupee className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">
                Estimated Price
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground break-words tabular-nums">
                {formatINR(animatedPrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border/60" />

        {/* Secondary metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Price Range */}
          <div
            className="flex items-start gap-3 opacity-0 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">
                Price Range
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground break-words tabular-nums">
                {formatINR(animatedLow)} – {formatINR(animatedHigh)}
              </p>
            </div>
          </div>

          {/* Price per sq ft */}
          <div
            className="flex items-start gap-3 opacity-0 animate-slide-up"
            style={{ animationDelay: "500ms" }}
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              <Ruler className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">
                Price per sq. ft.
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground tabular-nums">
                {formatINR(animatedPsf)}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison note */}
        <div
          className="flex items-center gap-2 rounded-lg bg-muted/60 border border-border/30 px-4 py-3 opacity-0 animate-fade-in"
          style={{ animationDelay: "700ms" }}
        >
          <Building className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            Based on analysis of similar properties in the selected locality.
            Actual prices may vary depending on exact location and market conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
