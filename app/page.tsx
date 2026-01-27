import { CoffeeScroll } from "./components/CoffeeScroll";
import { Features } from "./components/home/Features";
import { BrandStory } from "./components/home/BrandStory";
import { Gallery } from "./components/home/Gallery";
import { Locations } from "./components/home/Locations";
import { ProductShowcase } from "./components/home/ProductShowcase";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <CoffeeScroll />
      <Features />
      <ProductShowcase />
      <BrandStory />
      <Gallery />
      <Locations />
    </div>
  );
}
