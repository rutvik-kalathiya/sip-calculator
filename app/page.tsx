import Link from "next/link";
import InvestmentCalculator from "./components/InvestmentCalculator";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <InvestmentCalculator />
      <Footer />
    </div>
  );
}