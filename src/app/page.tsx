import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeagueTabs from "@/components/LeagueTabs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LeagueTabs />
      </main>
      <Footer />
    </>
  );
}
