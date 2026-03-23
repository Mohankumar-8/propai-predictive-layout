import { IndianRupee, TrendingUp, Ruler, CheckCircle2 } from "lucide-react";
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

const ResultCard = ({ estimatedPrice, priceRangeLow, priceRangeHigh, area }: ResultCardProps) => {
  const pricePerSqFt = Math.round(estimatedPrice / area);

  return (
    <Card className="opacity-0 animate-scale-in overflow-hidden border-border/40 shadow-lg">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80" />
      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Success badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold opacity-0 animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Prediction Complete
        </div>

        {/* Estimated Price */}
        <div
          className="flex items-start gap-3 opacity-0 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <IndianRupee className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">Estimated Price</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground break-words">
              {formatINR(estimatedPrice)}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border/60" />

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
              <p className="text-sm font-medium text-muted-foreground">Price Range</p>
              <p className="text-sm sm:text-base font-semibold text-foreground break-words">
                {formatINR(priceRangeLow)} – {formatINR(priceRangeHigh)}
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
              <p className="text-sm font-medium text-muted-foreground">Price per sq. ft.</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                {formatINR(pricePerSqFt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
