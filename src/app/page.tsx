import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeagueTabs from "@/components/LeagueTabs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <LeagueTabs header={<Header />} hero={<Hero />} />
      </main>
      <Footer />
    </>
  );
}
