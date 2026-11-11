import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CallDemo from "@/components/CallDemo";
import LanguageStrip from "@/components/LanguageStrip";
import Offerings from "@/components/Offerings";
import HowItWorks from "@/components/HowItWorks";
import Benchmarks from "@/components/Benchmarks";
import Comparison from "@/components/Comparison";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <CallDemo />
        <LanguageStrip />
        <Offerings />
        <HowItWorks />
        <Benchmarks />
        <Comparison />
        <Faq />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
