import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "../Homepage";
import InputContainer from "../InputContainer";
import { User } from "lucide-react";
import InfoTemplate from "./InfoTemplate";
import { watch } from "fs";
interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
}
const Fullname = ({ register, watch }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Please enter your full name. We use this to address you correctly in notifications and keep your records accurate." />
      <div className="flex flex-col gap-2">
        <InputContainer
          watch={watch}
          register={register}
          id="firstName"
          label="First Name"
          type="text"
        />
        <InputContainer
          watch={watch}
          register={register}
          id="lastName"
          label="Last Name"
          type="text"
        />
      </div>
    </>
  );
};

export default Fullname;
