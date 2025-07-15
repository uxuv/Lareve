import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Cards from "./components/Cards";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="w-full sm:max-w-[700px] sm:mx-auto">
      <Header />
      <div className="pt-32">
        <Hero />
        <Cards />
      </div>
    </div>
  </StrictMode>
);
