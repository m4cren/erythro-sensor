import React from "react";
import { Activity, HeartPlus, Stethoscope, Sun } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4  p-8 rounded-xl shadow-lg text-white max-w-xl mx-auto">
      <h1 className="text-lg sm:text-xl md:text-2xl  font-bold text-center">
        Welcome to the Erythro Sensor Fillup Form
      </h1>
      <p className="text-center text-xs  md:text-sm  text-white/70 max-w-lg  md:max-w-md">
        Fill up the form carefully to ensure your sensor data is accurate. Your
        participation helps us provide better insights and reliable results.
      </p>
      <div className="flex w-40 items-center justify-around">
        <Stethoscope />
        <Activity />
        <HeartPlus />
      </div>
    </div>
  );
};

export default Welcome;
