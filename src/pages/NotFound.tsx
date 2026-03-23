import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <Section spacing="lg">
        <Container className="text-center">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary opacity-0 animate-fade-up">404</h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
            Oops! Page not found
          </p>
          <div className="mt-8 opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <Link to="/">
              <Button variant="hero" size="lg">Return to Home</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default NotFound;
