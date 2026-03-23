import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const maxWidths = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
} as const;

const Container = ({ children, className, size = "lg", as: Tag = "div" }: ContainerProps) => (
  <Tag className={cn("mx-auto w-full px-5 sm:px-8", maxWidths[size], className)}>
    {children}
  </Tag>
);

export default Container;
