import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "../Homepage";
import InputContainer from "../InputContainer";
import InfoTemplate from "./InfoTemplate";

interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
}
const Email = ({ register, watch }: Props) => {
  return (
    <>
      <InfoTemplate sub_lbl="Add your email address to receive confirmations, updates, and relevant notifications." />
      <div className="flex flex-col gap-2">
        <InputContainer
          watch={watch}
          id="email"
          label="Email"
          register={register}
          type="email"
        />
      </div>
    </>
  );
};

export default Email;
