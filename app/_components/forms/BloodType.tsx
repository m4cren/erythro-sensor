import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "../Homepage";
import SelectContainer from "../SelectContainer";
import InfoTemplate from "./InfoTemplate";
interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
}
const bloodTypeOptions = [
  { label: "A+", value: "A+" },
  { label: "A−", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B−", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB−", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O−", value: "O-" },
];

const BloodType = ({ register, watch }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Provide your blood type so we can give you accurate health insights and recommendations based on your results." />

      <div className="flex flex-col gap-2">
        <SelectContainer
          options={bloodTypeOptions}
          watch={watch}
          id="blood_type"
          label="Blood Type"
          register={register}
        />
      </div>
    </>
  );
};

export default BloodType;
