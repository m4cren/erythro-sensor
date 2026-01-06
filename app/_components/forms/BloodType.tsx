import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import ArduinoData from "../ArduinoData";
import { FormData } from "../Homepage";
import InfoTemplate from "./InfoTemplate";
interface Props {
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<FormData>;
  bloodType: string;
}

const BloodType = ({ setBloodType, register, bloodType }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Your blood type is automatically detected so we can provide accurate health insights and recommendations based on your results." />

      <div className="flex flex-col gap-2  w-[40%]">
        {/* <SelectContainer
          options={bloodTypeOptions}
          watch={watch}
          id="blood_type"
          label="Blood Type"
          register={register}
        /> */}
        <ArduinoData
          setBloodType={setBloodType}
          register={register}
          bloodType={bloodType}
        />
      </div>
    </>
  );
};

export default BloodType;
