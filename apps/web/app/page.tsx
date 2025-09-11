import HeroSection from "@/components/pages/home/HeroSection";
import { ModeToggle } from "@/components/shared/ModeToggle";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <ModeToggle /> */}
    </div>
  );
}
