import Navigation from "@/components/Navigation/Navigation"
import HeroSection from "@/pages/home/components/HeroSection/HeroSection"
import InfoCards from "@/pages/home/components/infoCards/infoCards"
import InfoCards2 from "@/pages/home/components/infoCards2/infoCards2"
import HeroSec2 from "./components/HeroSec2/HeroSec2"

import InfoCards4 from "./components/infoCards4/infoCards4"
import Footer from "./components/footer/footer"


const HomePage = () => {
  return (
    <main className="bg-white">
      <HeroSec2 />
      <InfoCards />
      <InfoCards2 />
      <InfoCards4 />
      <Footer />
    </main>
  );
};

export default HomePage;
