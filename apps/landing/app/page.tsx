"use client";
import { HeroSection } from "./components/hero";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <HeroSection />
    </div>
  );
}
