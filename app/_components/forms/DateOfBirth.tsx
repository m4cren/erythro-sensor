import { Calendar, User } from "lucide-react";
import React, { useState } from "react";
import InputContainer from "../InputContainer";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "../Homepage";
import InfoTemplate from "./InfoTemplate";

interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
}
const DateOfBirth = ({ register, watch }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Provide your date of birth so we can personalize your experience and ensure proper age-related handling of your sensor data." />
      <div className="flex flex-col gap-2">
        <InputContainer
          watch={watch}
          id="dateOfBirth"
          label="Date of Birth"
          register={register}
          type="date"
        />
      </div>
    </>
  );
};

export default DateOfBirth;
