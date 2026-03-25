import { useState, useCallback } from "react";
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
  AlertCircle,
  RefreshCw,
  WifiOff,
} from "lucide-react";
import ResultCard from "@/components/ResultCard";
import EmptyState from "@/components/EmptyState";

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

const fieldHelpers: Partial<Record<FormKey, string>> = {
  location: "Select the city where the property is located",
  area: "Total carpet area of the property",
  furnishing: "Current furnishing status of the property",
  propertyType: "Type of residential property",
};

const MAX_AREA = 100000;
const MIN_AREA = 100;

function sanitizeArea(value: string): string {
  // Strip non-numeric chars except decimal
  const cleaned = value.replace(/[^0-9.]/g, "");
  // Prevent multiple decimals
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
  return cleaned;
}

function validate(form: typeof initialForm): Partial<Record<FormKey, string>> {
  const errors: Partial<Record<FormKey, string>> = {};
  for (const key of Object.keys(form) as FormKey[]) {
    if (!form[key].trim()) {
      errors[key] = `${fieldLabels[key]} is required`;
    }
  }
  const areaNum = Number(form.area);
  if (form.area.trim()) {
    if (isNaN(areaNum) || areaNum < MIN_AREA) {
      errors.area = `Area must be at least ${MIN_AREA} sq. ft.`;
    } else if (areaNum > MAX_AREA) {
      errors.area = `Area cannot exceed ${MAX_AREA.toLocaleString()} sq. ft.`;
    }
  }
  return errors;
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}

const Field = ({ label, icon, error, helper, children }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
      <span className="text-primary/70">{icon}</span>
      {label}
    </label>
    {children}
    <div className="min-h-[1.25rem] overflow-hidden">
      {error ? (
        <p className="flex items-center gap-1 text-xs text-destructive animate-slide-up" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      ) : helper ? (
        <p className="text-xs text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  </div>
);

const baseSelect =
  "w-full h-11 rounded-xl border bg-background pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200 ease-out appearance-none cursor-pointer hover:shadow-sm hover:border-primary/20";

const baseInput =
  "w-full h-11 rounded-xl border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200 ease-out hover:shadow-sm hover:border-primary/20";

function fieldClass(hasError: boolean, base: string) {
  return `${base} ${
    hasError
      ? "border-destructive focus:ring-destructive/40 focus:border-destructive"
      : "border-input focus:ring-ring/50 focus:border-primary/30"
  }`;
}

interface InputWrapperProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InputWrapper = ({ icon, children }: InputWrapperProps) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
      {icon}
    </span>
    {children}
  </div>
);

interface PredictionResult {
  predicted_price: number;
  price_range: [number, number];
  price_per_sqft: number;
}

const fieldGroups: { title: string; fields: FormKey[] }[] = [
  { title: "Location & Size", fields: ["location", "area"] },
  { title: "Room Details", fields: ["bedrooms", "bathrooms"] },
  { title: "Amenities & Type", fields: ["parking", "furnishing", "propertyType"] },
];

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const showError = (key: FormKey) =>
    (touched[key] || submitted) ? errors[key] : undefined;

  const update = (key: FormKey, value: string) => {
    // Sanitize area input
    if (key === "area") {
      value = sanitizeArea(value);
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const blur = (key: FormKey) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const fetchPrediction = useCallback(async (formData: typeof initialForm, attempt = 0): Promise<PredictionResult> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const statusText = res.status >= 500
          ? "Server error — please try again in a moment"
          : res.status === 429
            ? "Too many requests — please wait a moment"
            : `Request failed (${res.status})`;
        throw new Error(statusText);
      }

      const data = await res.json();

      // Validate response shape
      if (
        typeof data.predicted_price !== "number" ||
        !Array.isArray(data.price_range) ||
        data.price_range.length !== 2
      ) {
        throw new Error("Invalid response from server");
      }

      return data as PredictionResult;
    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.name === "AbortError") {
        throw new Error("Request timed out — please check your connection and try again");
      }

      // Auto-retry once on network errors
      if (attempt < 1 && (err.message === "Failed to fetch" || err.name === "TypeError")) {
        await new Promise((r) => setTimeout(r, 1500));
        return fetchPrediction(formData, attempt + 1);
      }

      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        throw new Error("Unable to reach the server — please check your connection");
      }

      throw err;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setLoading(true);
    setApiError(null);
    setResult(null);
    setHasAttempted(true);

    try {
      const data = await fetchPrediction(form);
      setResult(data);
      setRetryCount(0);
    } catch (err: any) {
      setApiError(err.message || "Failed to get prediction. Please try again.");
      setRetryCount((c) => c + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (!isValid) return;
    setApiError(null);
    setLoading(true);
    setResult(null);

    fetchPrediction(form)
      .then((data) => {
        setResult(data);
        setRetryCount(0);
      })
      .catch((err: any) => {
        setApiError(err.message || "Still unable to connect. Please try again later.");
        setRetryCount((c) => c + 1);
      })
      .finally(() => setLoading(false));
  };

  const iconMap: Record<FormKey, React.ReactNode> = {
    location: <MapPin className="w-4 h-4" />,
    area: <Maximize2 className="w-4 h-4" />,
    bedrooms: <BedDouble className="w-4 h-4" />,
    bathrooms: <Bath className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />,
    furnishing: <Sofa className="w-4 h-4" />,
    propertyType: <Building2 className="w-4 h-4" />,
  };

  const renderSelect = (key: FormKey, options: string[], placeholder: string) => (
    <InputWrapper icon={iconMap[key]}>
      <select
        className={fieldClass(!!showError(key), baseSelect)}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        onBlur={() => blur(key)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </InputWrapper>
  );

  const filledCount = Object.values(form).filter((v) => v.trim()).length;
  const totalFields = Object.keys(form).length;

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 space-y-6"
      >
        {/* Progress indicator */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Form completion</span>
            <span>{filledCount}/{totalFields} fields</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/70 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(filledCount / totalFields) * 100}%` }}
            />
          </div>
        </div>

        {fieldGroups.map((group, gi) => (
          <fieldset key={group.title} className="space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {group.fields.map((key, fi) => {
                const isLast = group.fields.length % 2 !== 0 && fi === group.fields.length - 1;
                const wrapClass = isLast ? "sm:col-span-2" : "";

                if (key === "area") {
                  return (
                    <div key={key} className={wrapClass}>
                      <Field label={fieldLabels[key]} icon={iconMap[key]} error={showError(key)} helper={fieldHelpers[key]}>
                        <InputWrapper icon={iconMap[key]}>
                          <input
                            type="text"
                            inputMode="numeric"
                            min={MIN_AREA}
                            max={MAX_AREA}
                            placeholder="e.g. 1200"
                            className={fieldClass(!!showError(key), baseInput)}
                            value={form[key]}
                            onChange={(e) => update(key, e.target.value)}
                            onBlur={() => blur(key)}
                            onKeyDown={(e) => {
                              // Prevent e, E, +, - in area input
                              if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </InputWrapper>
                      </Field>
                    </div>
                  );
                }

                const optionsMap: Record<string, string[]> = {
                  location: cities,
                  bedrooms: bedroomOptions,
                  bathrooms: bathroomOptions,
                  parking: parkingOptions,
                  furnishing: furnishingOptions,
                  propertyType: propertyTypes,
                };

                const placeholderMap: Record<string, string> = {
                  location: "Select city…",
                  bedrooms: "Select BHK…",
                  bathrooms: "Select count…",
                  parking: "Has parking?",
                  furnishing: "Select status…",
                  propertyType: "Select type…",
                };

                return (
                  <div key={key} className={wrapClass}>
                    <Field label={fieldLabels[key]} icon={iconMap[key]} error={showError(key)} helper={fieldHelpers[key]}>
                      {renderSelect(key, optionsMap[key], placeholderMap[key])}
                    </Field>
                  </div>
                );
              })}
            </div>
            {gi < fieldGroups.length - 1 && (
              <div className="border-t border-border/30" />
            )}
          </fieldset>
        ))}

        {/* API Error with retry */}
        {apiError && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3 animate-scale-in" role="alert">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <WifiOff className="w-4 h-4 text-destructive" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-foreground">Prediction failed</p>
                <p className="text-xs text-muted-foreground">{apiError}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRetry}
              disabled={loading}
              className="w-full gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {retryCount > 2 ? "Try one more time" : "Retry prediction"}
            </Button>
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

      {/* Results or empty state */}
      {result ? (
        <ResultCard
          estimatedPrice={result.predicted_price}
          priceRangeLow={result.price_range[0]}
          priceRangeHigh={result.price_range[1]}
          area={Number(form.area) || 1}
        />
      ) : hasAttempted && !loading && !apiError ? (
        <EmptyState
          title="No results available"
          description="The prediction didn't return results. Try adjusting your inputs and submit again."
        />
      ) : !hasAttempted ? (
        <EmptyState />
      ) : null}
    </div>
  );
};

export default PredictionForm;
