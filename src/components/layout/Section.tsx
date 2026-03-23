import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

const spacings = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-28 md:py-36",
} as const;

const Section = ({ children, className, spacing = "md" }: SectionProps) => (
  <section className={cn(spacings[spacing], className)}>{children}</section>
);

export default Section;
