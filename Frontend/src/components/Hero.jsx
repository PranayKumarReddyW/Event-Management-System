import React from "react";
import { Spotlight } from "./ui/spotlight";
import CountdownTimer from "../components/Timer";
import { TypeAnimation } from "react-type-animation";

export default function SpotlightPreview() {
  const targetDate = "2024-12-20T18:00:00";

  return (
    <>
      <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Advitiya
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            "Advitiya" is an exciting event conducted by the Department of
            Computer Science and Data Science (CSE DS) at Rajeev Gandhi Memorial
            College of Engineering and Technology (RGMCET). Join us as we
            celebrate innovation, creativity, and knowledge sharing. This event
            brings together students, faculty, and industry experts for a day
            filled with insightful talks, hands-on workshops, and interactive
            sessions aimed at fostering learning and collaboration.
          </p>
          <div className="mt-8 flex justify-center">
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </>
  );
}
