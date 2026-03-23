import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const PageLayout = ({ children, className, gradient = false }: PageLayoutProps) => (
  <div
    className={cn(
      "min-h-screen overflow-x-hidden",
      gradient && "bg-gradient-to-b from-background to-muted/20",
      className,
    )}
  >
    <Navbar />
    {children}
  </div>
);

export default PageLayout;
