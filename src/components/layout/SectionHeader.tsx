import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

const SectionHeader = ({ title, subtitle, className, align = "center" }: SectionHeaderProps) => (
  <div className={cn("mb-10 sm:mb-14", align === "center" && "text-center", className)}>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance opacity-0 animate-fade-up">
      {title}
    </h2>
    {subtitle && (
      <p
        className={cn(
          "mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg opacity-0 animate-fade-up",
          align === "center" && "max-w-2xl mx-auto",
        )}
        style={{ animationDelay: "80ms" }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
