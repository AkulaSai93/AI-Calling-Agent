import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CallDemo from "@/components/CallDemo";
import LanguageStrip from "@/components/LanguageStrip";
import Offerings from "@/components/Offerings";

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
      </main>
    </>
  );
}
