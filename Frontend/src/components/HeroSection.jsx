import React from "react";
import { Vortex } from "./ui/vortex";
import { Button } from "./ui/button";

export default function VortexDemo() {
  return (
    <div className="w-screen mx-auto h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-6xl font-bold text-center text-white">Advitiya</h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button variant="destructive" className="px-4 py-2 text-white">
            Watch Trailer
          </Button>
        </div>
      </Vortex>
    </div>
  );
}
