import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "./Homepage";
import { useState } from "react";

interface Props {
  label: string;
  type: React.HTMLInputTypeAttribute | undefined;
  id: keyof FormData & string;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>; // ✅ properly typed watch
}

const InputContainer = ({ id, label, type, register, watch }: Props) => {
  const value = watch(id); // value is now typed correctly
  const [isFocused, setIsFocused] = useState(false);

  // Check if the label should float
  const shouldFloat =
    type === "date" ||
    isFocused ||
    (value !== undefined && value !== null && value !== "");

  return (
    <div className="relative w-[80vw] md:w-[50vw] lg:w-100">
      <input
        type={type}
        id={id}
        {...register(id)}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full border border-white/60 rounded-md px-2 pt-4 lg:pt-5 pb-2 lg:pb-3 text-xs lg:text-sm focus:border-[#A8C7FA] outline-none bg-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-2 bg-[#0E0E0E] px-1 text-white/70 transition-all duration-200
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

export default InputContainer;
