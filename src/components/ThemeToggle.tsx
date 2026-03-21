import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const options = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const currentIndex = options.findIndex((o) => o.value === theme);
  const next = options[(currentIndex + 1) % options.length];

  const CurrentIcon = options[currentIndex]?.icon ?? Monitor;

  return (
    <button
      onClick={() => setTheme(next.value)}
      className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-95 transition-all duration-200"
      aria-label={`Switch to ${next.label} theme`}
      title={`Current: ${theme} · Click for ${next.label}`}
    >
      <CurrentIcon className="w-[18px] h-[18px]" />
    </button>
  );
};

export default ThemeToggle;
