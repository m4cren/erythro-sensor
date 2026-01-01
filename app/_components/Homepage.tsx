"use client";
import InputContainer from "./InputContainer";
import { useForm } from "react-hook-form";
import ProgressNav from "./ProgressNav";
import { useProgressState } from "../hooks/useProgressState";
import Welcome from "./forms/Welcome";
import Fullname from "./forms/Fullname";
import DateOfBirth from "./forms/DateOfBirth";
import PhoneNumber from "./forms/PhoneNumber";
import Email from "./forms/Email";
import Finished from "./forms/Finished";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { usePopupModal } from "../hooks/usePopupModal";
import NotificationModal from "./NotificationModal";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import BloodType from "./forms/BloodType";

export type FormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  blood_type: string;
  phoneNumber: string;
  email: string;
};

const Homepage = () => {
  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted },
  } = useForm<FormData>();
  const { handlePhase, dispatch, progressState } = useProgressState();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { handleModalClosing, handleModalOpen, isModalClosing, isModalOpen } =
    usePopupModal({ expirable: true });
  const [popupType, setPopupType] = useState<"error" | "success">("error");
  const showError = (message: string) => {
    setPopupType("error");
    setErrMsg(message);
    handleModalOpen();
  };
  const [previewData, setPreviewData] = useState<FormData | null>(null);

  const renderCurrentForm = () => {
    switch (progressState.currentPhase) {
      case "welcome":
        return <Welcome />;
      case "full_name":
        return <Fullname register={register} watch={watch} />;
      case "date_of_birth":
        return <DateOfBirth register={register} watch={watch} />;
      case "blood_type":
        return <BloodType register={register} watch={watch} />;
      case "phone_number":
        return <PhoneNumber register={register} setValue={setValue} />;
      case "email":
        return <Email register={register} watch={watch} />;
      case "finished":
        return (
          <Finished
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            data={previewData || getValues()}
          />
        );
      default:
        return <Welcome />;
    }
  };

  const getNextForm = (current = progressState.currentPhase) => {
    switch (current) {
      case "welcome":
        return "full_name";

      case "full_name": {
        const firstName = getValues("firstName")?.trim();
        const lastName = getValues("lastName")?.trim();

        if (!firstName || !lastName) {
          showError("Please enter your full name.");
          return "full_name";
        }

        if (firstName.length < 2 || lastName.length < 2) {
          showError("Name must be at least 2 characters long.");
          return "full_name";
        }

        return "date_of_birth";
      }

      case "date_of_birth": {
        const dob = getValues("dateOfBirth");

        if (!dob) {
          showError("Date of birth is required.");
          return "date_of_birth";
        }

        return "blood_type";
      }
      case "blood_type": {
        const dob = getValues("blood_type");

        if (!dob) {
          showError("Blood type is required.");
          return "blood_type";
        }

        return "phone_number";
      }

      case "phone_number": {
        const phone = getValues("phoneNumber")?.replace(/\D/g, "");

        if (!phone) {
          showError("Phone number is required.");
          return "phone_number";
        }

        if (phone.length < 12) {
          showError("Phone number must be at least 12 digits.");
          return "phone_number";
        }

        return "email";
      }

      case "email": {
        const email = getValues("email")?.trim();

        if (!email) {
          showError("Email address is required.");
          return "email";
        }

        if (!email.includes("@") || email.length < 5) {
          showError("Please enter a valid email address.");
          return "email";
        }
        setPreviewData(getValues());
        return "finished";
      }

      default:
        return "welcome";
    }
  };

  const getPreviousForm = (current = progressState.currentPhase) => {
    if (current === "finished") {
      return "email";
    } else if (current === "email") {
      return "phone_number";
    } else if (current === "phone_number") {
      return "blood_type";
    } else if (current === "date_of_birth") {
      return "full_name";
    } else if (current === "blood_type") {
      return "date_of_birth";
    } else if (current === "full_name") {
      return "welcome";
    } else {
      return "welcome"; // default fallback
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/notify/email", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          subject: "Your Blood Type Test Result",
          message: `Dear ${data.firstName},

                    We are writing to inform you that your recent blood type test has been processed successfully. Your blood type is: ${data.blood_type}.`,
        }),
      });
    } catch (e) {
      console.log(e);
    }

    // Show success modal
    setPopupType("success");
    setErrMsg("Data submitted successfully!");
    handleModalOpen();

    // Move to finished phase
    dispatch(handlePhase("finished"));
  };
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(
          "relative flex flex-col justify-between bg-[#0E0E0E] w-[95vw] sm:w-[85vw] md:w-[70vw]! overflow-x-hidden h-[80dvh] sm:h-[60dvh] md:h-[50dvh] transition duration-300 rounded-2xl p-4 lg:p-6",
          {
            "h-[95dvh]! lg:h-[85dvh]!":
              (isSubmitted || progressState.currentPhase == "finished") &&
              progressState.currentPhase == "finished",
          }
        )}
      >
        {isModalOpen && errMsg && (
          <NotificationModal
            handleModalClosing={handleModalClosing}
            isModalClosing={isModalClosing}
            label={errMsg}
            type={popupType}
          />
        )}

        <div className="">
          <ProgressNav />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={progressState.currentPhase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-start lg:items-center justify-between"
          >
            {renderCurrentForm()}
          </motion.div>
        </AnimatePresence>

        <div
          className={classNames("flex gap-2 justify-end", {
            "justify-start!": progressState.currentPhase == "finished",
          })}
        >
          {progressState.index != 0 && !isSubmitted && (
            <button
              type="button"
              className=" px-3 font-medium cursor-pointer border border-[#4A4A4A] transition dursation-100 py-1 rounded-full text-xs md:text-sm"
              onClick={(e) => {
                e.preventDefault();
                dispatch(handlePhase(getPreviousForm()));
              }}
            >
              Back
            </button>
          )}
          {progressState.currentPhase != "finished" && (
            <button
              type="button"
              className="bg-[#4A4A4A] px-6 font-medium cursor-pointer hover:bg-white/20 transition dursation-100 py-1 rounded-full text-xs md:text-sm"
              onClick={(e) => {
                e.preventDefault();
                dispatch(handlePhase(getNextForm()));
              }}
            >
              Next
            </button>
          )}
          {isSubmitted && progressState.currentPhase == "finished" && (
            <button
              type="button"
              className="flex text-sm lg:text-lg items-center gap-2
             text-white font-semibold px-6 py-2 rounded-full 
             transition-all duration-200 transform hover:scale-101 shadow-md 
              cursor-pointer mx-auto bg-[#4A4A4A]"
              onClick={(e) => {
                e.preventDefault();
                // Reset form
                reset();
                setPreviewData(null);
                dispatch(handlePhase("welcome"));
              }}
            >
              <PlusCircle size={18} />
              Submit New Data
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default Homepage;
