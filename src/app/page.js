import Banner from "./(pages)/Components/MainPage/Banner";
import Categories from "./(pages)/Components/MainPage/Categories";
import CenterBanner from "./(pages)/Components/MainPage/CenterBanner";
import Products from "./(pages)/Components/MainPage/Products";

export default function Home() {
  return (
   <div>
    <Banner />
    <Categories />
    <Products />
    <CenterBanner />
   </div>
  );
}
