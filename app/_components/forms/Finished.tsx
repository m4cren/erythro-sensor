import React from "react";
import { CheckCircle2 } from "lucide-react";
import { FormData } from "../Homepage";
import { formatDate } from "@/app/functions/formatDate";

interface Props {
  isSubmitting: boolean;
  isSubmitted: boolean;
  data?: FormData;
}

const Finished = ({ isSubmitting, isSubmitted, data }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl shadow-lg text-white max-w-xl mx-auto bg-[#0E0E0E]">
      {!isSubmitted ? (
        <>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
            Ready to Submit
          </h1>

          <p className="text-center text-xs lg:text-sm text-white/70 max-w-md">
            Please review your information carefully. Once submitted, your data
            will be securely recorded.
          </p>

          {data && (
            <div className="w-full mt-4 p-4 rounded-lg border border-white/20 bg-[#1A1A1A]">
              <h3 className="text-xs md:text-sm font-semibold mb-2 text-white/80">
                Preview of Your Data
              </h3>
              <div className="text-xs md:text-sm flex flex-col gap-1 text-white/70">
                <div>
                  <span className="font-medium text-white/90">Full Name:</span>{" "}
                  {data.firstName} {data.lastName}
                </div>
                <div>
                  <span className="font-medium text-white/90">
                    Date of Birth:
                  </span>{" "}
                  {formatDate(data.dateOfBirth)}
                </div>
                <div>
                  <span className="font-medium text-white/90">
                    Phone Number:
                  </span>{" "}
                  {data.phoneNumber}
                </div>
                <div>
                  <span className="font-medium text-white/90">Email:</span>{" "}
                  {data.email}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex text-lg! md:text-xl! items-center justify-center gap-2 px-12 py-2 rounded-full
                         font-semibold cursor-pointer
                         bg-[#4A4A4A] hover:bg-white/20 transition
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}

              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      ) : (
        <>
          <CheckCircle2 size={48} className="text-green-400" />

          <h1 className="text-lg md:text-2xl font-bold text-center">
            Submitted Successfully
          </h1>

          <p className="text-center text-xs md:text-sm text-white/70 max-w-md">
            Thank you for your participation. Your information has been securely
            recorded.
          </p>

          {data && (
            <div className="w-full mt-4 p-4 rounded-lg border border-white/20 bg-[#1A1A1A]">
              <h3 className="text-xs md:text-sm font-semibold mb-2 text-white/80">
                Your Submitted Data
              </h3>
              <div className="flex text-xs md:text-sm flex-col gap-1 text-white/70">
                <div>
                  <span className="font-medium text-white/90">Full Name:</span>{" "}
                  {data.firstName} {data.lastName}
                </div>
                <div>
                  <span className="font-medium text-white/90">
                    Date of Birth:
                  </span>{" "}
                  {formatDate(data.dateOfBirth)}
                </div>
                <div>
                  <span className="font-medium text-white/90">
                    Phone Number:
                  </span>{" "}
                  {data.phoneNumber}
                </div>
                <div>
                  <span className="font-medium text-white/90">Email:</span>{" "}
                  {data.email}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Finished;
