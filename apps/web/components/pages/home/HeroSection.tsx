"use client";
import React from "react";
import { TypewriterEffectSmooth } from "../../ui/typewriter-effect";

const HeroSection = () => {
  const words = [
    {
      text: "I",
    },
    {
      text: "n",
    },
    {
      text: "t",
    },
    {
      text: "e",
    },
    {
      text: "r",
    },
    {
      text: "v",
    },
    {
      text: "i",
    },
    {
      text: "e",
    },
    {
      text: "w",
    },
    {
      text: ".",
    },
    {
      text: "a",
    },
    {
      text: "i",
    },
  ];
  return (
    <div className="relative h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(109, 49, 219, 0.25), transparent 80%), #000000",
        }}
      />
      ;
      <div className="flex flex-col  items-center z-10">
        <p className={` font-normal text-lg`}>
          Tool by a Job <span className="text-primary">Aspirants</span> for Job
          <span className="text-primary"> Aspirants</span>
        </p>
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
};

export default HeroSection;
