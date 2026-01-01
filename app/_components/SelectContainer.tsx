import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "./Homepage";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  id: keyof FormData & string;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  options: Option[];
}

const SelectContainer = ({ id, label, register, watch, options }: Props) => {
  const value = watch(id);
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat =
    isFocused || (value !== undefined && value !== null && value !== "");

  return (
    <div className="relative w-[80vw] md:w-[50vw] lg:w-100">
      <select
        id={id}
        {...register(id)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full cursor-pointer border border-white/60 rounded-md
          px-2 pr-8 pt-4 lg:pt-5 pb-2 lg:pb-3
          text-xs lg:text-sm focus:border-[#A8C7FA] outline-none bg-transparent
          appearance-none"
        defaultValue=""
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>

      {/* Animated Chevron */}
      <ChevronDown
        size={16}
        className="
          pointer-events-none absolute right-2 top-1/2 -translate-y-1/2
          text-white/60
          transition-transform duration-200 ease-out
          peer-focus:rotate-180
        "
      />

      <label
        htmlFor={id}
        className={`absolute left-2 bg-[#0E0E0E] px-1 transition-all duration-200
          ${
            shouldFloat
              ? "-top-1 text-[0.6rem] text-[#A8C7FA]"
              : "top-3 lg:top-4 text-xs lg:text-sm text-white/50"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectContainer;
