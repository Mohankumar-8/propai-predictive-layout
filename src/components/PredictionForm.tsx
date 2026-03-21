import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ResultCard from "@/components/ResultCard";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
];

const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];
const bathroomOptions = ["1", "2", "3", "4"];
const parkingOptions = ["Yes", "No"];
const furnishingOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];
const propertyTypes = ["Apartment", "Villa", "Independent House"];

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const selectClass =
  "w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none cursor-pointer";

const inputClass =
  "w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";

interface PredictionResult {
  predicted_price: number;
  price_range: [number, number];
  price_per_sqft: number;
}

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [form, setForm] = useState({
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    furnishing: "",
    propertyType: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl border border-border/40 shadow-sm p-6 sm:p-8 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Location">
            <select className={selectClass} value={form.location} onChange={(e) => update("location", e.target.value)}>
              <option value="" disabled>Select city</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Area (sq. ft.)">
            <input type="number" min={100} placeholder="e.g. 1200" className={inputClass} value={form.area} onChange={(e) => update("area", e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Bedrooms">
            <select className={selectClass} value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)}>
              <option value="" disabled>Select</option>
              {bedroomOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Bathrooms">
            <select className={selectClass} value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)}>
              <option value="" disabled>Select</option>
              {bathroomOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Parking">
            <select className={selectClass} value={form.parking} onChange={(e) => update("parking", e.target.value)}>
              <option value="" disabled>Select</option>
              {parkingOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Furnishing">
            <select className={selectClass} value={form.furnishing} onChange={(e) => update("furnishing", e.target.value)}>
              <option value="" disabled>Select</option>
              {furnishingOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Property Type">
          <select className={selectClass} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)}>
            <option value="" disabled>Select</option>
            {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        {error && (
          <p className="text-sm text-destructive animate-fade-in">{error}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Predicting…
            </>
          ) : (
            "Predict Price"
          )}
        </Button>
      </form>

      {result && (
        <ResultCard
          estimatedPrice={result.predicted_price}
          priceRangeLow={result.price_range[0]}
          priceRangeHigh={result.price_range[1]}
          area={Number(form.area) || 1}
        />
      )}
    </div>
  );
};

export default PredictionForm;
