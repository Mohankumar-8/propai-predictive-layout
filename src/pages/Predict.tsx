import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "@/components/layout/SectionHeader";
import PredictionForm from "@/components/PredictionForm";

const Predict = () => {
  return (
    <PageLayout gradient>
      <Section spacing="lg">
        <Container size="sm">
          <SectionHeader
            title="Price Prediction"
            subtitle="Enter property details below to get an instant AI-powered estimate."
          />
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <PredictionForm />
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default Predict;
