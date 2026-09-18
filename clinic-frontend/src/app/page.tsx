import MainCarousel from "@/components/MainCarousel";
import RollingBanner from "@/components/RollingBanner";
import CategoryNav from "@/components/CategoryNav";
import CircularOverlay from "@/components/CircularOverlay";
import Selfies from "@/components/main/Selfies";
import VlogSlider from "@/components/main/VlogSlider";
import SaftySlider from "@/components/main/SaftySlider";

export default function Home() {
  return (
    <>
      <MainCarousel/>
      <RollingBanner/>
      <CategoryNav/>
      <Selfies/>
      <CircularOverlay/>
      <VlogSlider/>
      <SaftySlider/>
    </>
  );
}
