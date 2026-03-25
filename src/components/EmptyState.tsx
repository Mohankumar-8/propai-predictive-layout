import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const EmptyState = ({
  icon,
  title = "No results yet",
  description = "Fill out the form above and submit to get your AI-powered property price prediction.",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-14 px-6 text-center rounded-2xl border border-dashed border-border/60 bg-muted/20">
    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
      {icon || <SearchX className="w-5 h-5 text-muted-foreground" />}
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs">{description}</p>
    </div>
  </div>
);

export default EmptyState;
