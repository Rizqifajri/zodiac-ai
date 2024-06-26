"use client";
import Navigation from "@/components/Navigation";
import Title from "@/components/title";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-screen">
      <Navigation/>
      <Title />
    </section>
  );
}
