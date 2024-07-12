"use client";
import Navigation from "@/components/Navigation";
import ParticlesContainer from "@/components/particles/particlesContainer";
import Title from "@/components/title";
import Image from "next/image";
import Particles from "react-tsparticles";

export default function Home() {
  return (
    <>
      <ParticlesContainer />
      <section className="h-screen">
        <Title />
      </section>
    </>
  );
}
