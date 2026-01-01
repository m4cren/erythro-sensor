"use client"; // <- must be at the very top
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "../Homepage";
import InputContainer from "../InputContainer";
import PhoneInput from "../PhoneInput";
import InfoTemplate from "./InfoTemplate";
interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
}
const PhoneNumber = ({ register, setValue }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Enter your phone number to contact you if needed for updates or important information." />
      <div className="flex flex-col gap-2">
        <PhoneInput
          id="phoneNumber"
          label="Phone Number"
          register={register}
          setValue={setValue}
        />
      </div>
    </>
  );
};

export default PhoneNumber;
