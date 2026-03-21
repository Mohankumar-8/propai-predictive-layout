import { IndianRupee, TrendingUp, Ruler } from "lucide-react";
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
    <Card className="animate-fade-in mt-8 overflow-hidden border-border/40 shadow-md">
      <div className="h-1 w-full bg-primary" />
      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Estimated Price */}
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IndianRupee className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Estimated Price</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {formatINR(estimatedPrice)}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Price Range */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price Range</p>
              <p className="text-base font-semibold text-foreground">
                {formatINR(priceRangeLow)} – {formatINR(priceRangeHigh)}
              </p>
            </div>
          </div>

          {/* Price per sq ft */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <Ruler className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price per sq. ft.</p>
              <p className="text-base font-semibold text-foreground">
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
