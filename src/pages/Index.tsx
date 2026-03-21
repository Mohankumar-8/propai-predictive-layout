import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 PropAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
