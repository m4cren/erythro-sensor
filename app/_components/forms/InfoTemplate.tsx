import { Stethoscope } from "lucide-react";
import React from "react";

interface Props {
  sub_lbl: string;
}

const InfoTemplate = ({ sub_lbl }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Stethoscope /> Erythro Sensor
      </h3>

      <p className="text-[0.65rem] md:text-xs text-gray-600 dark:text-gray-300 max-w-60">
        {sub_lbl}
      </p>
    </div>
  );
};

export default InfoTemplate;
