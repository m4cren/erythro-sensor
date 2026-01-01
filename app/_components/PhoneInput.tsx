"use client";
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "./Homepage";
import classNames from "classnames";

export const countryCodes = [
  { code: "+1", label: "US", format: "XXXX-XXX-XXX" },
  { code: "+44", label: "UK", format: "XXXX-XXX-XXX" },
  { code: "+91", label: "IN", format: "XXXXX-XXXX" },
  { code: "+81", label: "JP", format: "XX-XXXX-XXX" },
  { code: "+86", label: "CN", format: "XXX-XXXX-XXX" },
  { code: "+63", label: "PH", format: "XXXX-XXX-XXX" },
];

interface Props {
  label: string;
  id: keyof FormData;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
}

const PhoneInput = ({ id, label, register, setValue }: Props) => {
  const [selectedCode, setSelectedCode] = React.useState("+63");
  const [number, setNumber] = React.useState("");

  const formatNumber = (digits: string, format: string) => {
    let formatted = "";
    let i = 0;
    for (const char of format) {
      if (char === "X") {
        if (i < digits.length) formatted += digits[i++];
      } else {
        if (i < digits.length) formatted += char;
      }
    }
    return formatted;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const format =
      countryCodes.find((c) => c.code === selectedCode)?.format ??
      "XXXX-XXX-XXXX";

    setNumber(formatNumber(digits, format));
  };

  // ✅ Update RHF value properly
  React.useEffect(() => {
    setValue(id, `${selectedCode} ${number.replace(/\D/g, "")}`, {
      shouldValidate: true,
    });
  }, [selectedCode, number, id, setValue]);

  return (
    <div className="relative">
      <div className="flex w-[80vw] md:w-[50vw] lg:w-90 items-center border border-white/60 rounded-md px-2 pt-2 lg:pt-4 pb-1 lg:pb-3 text-xs lg:text-sm bg-transparent focus-within:border-[#A8C7FA] transition-all">
        <select
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="bg-transparent text-xs lg:text-sm outline-none border-r border-white/30 pr-2"
        >
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label} {c.code}
            </option>
          ))}
        </select>

        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          placeholder=" "
          className="peer flex-1 bg-transparent text-xs lg:text-sm px-2 outline-none"
        />
      </div>

      <label
        className={classNames(
          "absolute left-2 -top-1 text-[0.6rem] bg-[#0E0E0E] px-1 transition-all",
          number
            ? "text-[#A8C7FA]"
            : "peer-placeholder-shown:top-2 lg:peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs lg:peer-placeholder-shown:text-sm text-white/50"
        )}
      >
        {label}
      </label>

      {/* Register once, no hidden input */}
      <input type="hidden" {...register(id, { required: true })} />
    </div>
  );
};

export default PhoneInput;
