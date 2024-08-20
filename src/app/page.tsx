"use client";
import ParticlesContainer from "@/components/particles/particlesContainer";
import Title from "@/components/title";

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
