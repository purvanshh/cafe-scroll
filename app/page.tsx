import { CoffeeScroll } from "./components/CoffeeScroll";
import { Features } from "./components/home/Features";
import { BrandStory } from "./components/home/BrandStory";
import { Gallery } from "./components/home/Gallery";
import { Locations } from "./components/home/Locations";
import { ProductShowcase } from "./components/home/ProductShowcase";
import { Shop } from "./components/home/Shop";
import { About } from "./components/home/About";
import { Blog } from "./components/home/Blog";
import { Team } from "./components/home/Team";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <CoffeeScroll />
      <Features />
      <ProductShowcase />
      <Shop />
      <BrandStory />
      <About />
      <Team />
      <Gallery />
      <Blog />
      <Locations />
    </div>
  );
}

