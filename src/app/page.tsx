import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Cases } from "@/components/sections/Cases";
import { Technologies } from "@/components/sections/Technologies";
import { About } from "@/components/sections/About";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Solutions />
        <Cases />
        <Technologies />
        <About />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
