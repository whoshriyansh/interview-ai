import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const Loader = () => {
  const words = [
    {
      text: "G",
    },
    {
      text: "e",
    },
    {
      text: "n",
    },
    {
      text: "e",
    },
    {
      text: "r",
    },
    {
      text: "a",
    },
    {
      text: "t",
    },
    {
      text: "i",
    },
    {
      text: "n",
    },
    {
      text: "g",
    },
  ];
  return (
    <div className="flex flex-col  items-center z-10">
      <TypewriterEffectSmooth
        words={words}
        className="text-xs sm:text-base md:text-3xl"
        isInfinite={true}
        delay={0.2}
      />
    </div>
  );
};

export default Loader;
