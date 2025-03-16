import InvestmentCalculator from "./components/InvestmentCalculator";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <NavBar />
      <InvestmentCalculator />
      <Footer />
    </div>
  );
}