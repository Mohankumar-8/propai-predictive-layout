import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  Sofa,
  Building2,
} from "lucide-react";
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

type FormKey = keyof typeof initialForm;

const initialForm = {
  location: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  furnishing: "",
  propertyType: "",
};

const fieldLabels: Record<FormKey, string> = {
  location: "Location",
  area: "Area (sq. ft.)",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  parking: "Parking",
  furnishing: "Furnishing",
  propertyType: "Property Type",
};

function validate(form: typeof initialForm): Partial<Record<FormKey, string>> {
  const errors: Partial<Record<FormKey, string>> = {};
  for (const key of Object.keys(form) as FormKey[]) {
    if (!form[key].trim()) {
      errors[key] = `${fieldLabels[key]} is required`;
    }
  }
  if (form.area.trim() && Number(form.area) < 100) {
    errors.area = "Area must be at least 100 sq. ft.";
  }
  return errors;
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, icon, error, children }: FieldProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs text-destructive animate-slide-up">{error}</p>
    )}
  </div>
);

const baseSelect =
  "w-full h-11 rounded-lg border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200 ease-out appearance-none cursor-pointer hover:shadow-sm";

const baseInput =
  "w-full h-11 rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200 ease-out hover:shadow-sm";

function fieldClass(hasError: boolean, base: string) {
  return `${base} ${
    hasError
      ? "border-destructive focus:ring-destructive/40 focus:border-destructive"
      : "border-input focus:ring-ring/50 focus:border-primary/30 hover:border-primary/20"
  }`;
}

interface PredictionResult {
  predicted_price: number;
  price_range: [number, number];
  price_per_sqft: number;
}

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const showError = (key: FormKey) =>
    (touched[key] || submitted) ? errors[key] : undefined;

  const update = (key: FormKey, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const blur = (key: FormKey) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setLoading(true);
    setApiError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setApiError(err.message || "Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 space-y-6"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Location" icon={<MapPin className="w-3.5 h-3.5" />} error={showError("location")}>
            <select className={fieldClass(!!showError("location"), baseSelect)} value={form.location} onChange={(e) => update("location", e.target.value)} onBlur={() => blur("location")}>
              <option value="" disabled>Select city</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Area (sq. ft.)" icon={<Maximize2 className="w-3.5 h-3.5" />} error={showError("area")}>
            <input type="number" min={100} placeholder="e.g. 1200" className={fieldClass(!!showError("area"), baseInput)} value={form.area} onChange={(e) => update("area", e.target.value)} onBlur={() => blur("area")} />
          </Field>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Bedrooms" icon={<BedDouble className="w-3.5 h-3.5" />} error={showError("bedrooms")}>
            <select className={fieldClass(!!showError("bedrooms"), baseSelect)} value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} onBlur={() => blur("bedrooms")}>
              <option value="" disabled>Select</option>
              {bedroomOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Bathrooms" icon={<Bath className="w-3.5 h-3.5" />} error={showError("bathrooms")}>
            <select className={fieldClass(!!showError("bathrooms"), baseSelect)} value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} onBlur={() => blur("bathrooms")}>
              <option value="" disabled>Select</option>
              {bathroomOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Parking" icon={<Car className="w-3.5 h-3.5" />} error={showError("parking")}>
            <select className={fieldClass(!!showError("parking"), baseSelect)} value={form.parking} onChange={(e) => update("parking", e.target.value)} onBlur={() => blur("parking")}>
              <option value="" disabled>Select</option>
              {parkingOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Furnishing" icon={<Sofa className="w-3.5 h-3.5" />} error={showError("furnishing")}>
            <select className={fieldClass(!!showError("furnishing"), baseSelect)} value={form.furnishing} onChange={(e) => update("furnishing", e.target.value)} onBlur={() => blur("furnishing")}>
              <option value="" disabled>Select</option>
              {furnishingOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
        </div>

        {/* Property Type — full width */}
        <Field label="Property Type" icon={<Building2 className="w-3.5 h-3.5" />} error={showError("propertyType")}>
          <select className={fieldClass(!!showError("propertyType"), baseSelect)} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} onBlur={() => blur("propertyType")}>
            <option value="" disabled>Select</option>
            {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        {apiError && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 rounded-lg px-4 py-3 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
            {apiError}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading || (submitted && !isValid)}>
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
