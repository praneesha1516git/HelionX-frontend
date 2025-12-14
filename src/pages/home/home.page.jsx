import Navigation from "@/components/Navigation/Navigation"
import HeroSection from "@/pages/home/components/HeroSection/HeroSection"
import InfoCards from "@/pages/home/components/infoCards/infoCards"
import InfoCards2 from "@/pages/home/components/infoCards2/infoCards2"


const HomePage = () => {
  return (
    <>
      <main>
        <HeroSection />
      
        <InfoCards />
        <InfoCards2 />
      </main>
    </>
  );
};

export default HomePage;