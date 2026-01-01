import classNames from "classnames";
import { XIcon, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface Props {
  type: "success" | "error" | "warning";
  label: string | undefined;
  isModalClosing: boolean;
  handleModalClosing: () => void;
}

const NotificationModal = ({
  label,
  type,
  handleModalClosing,
  isModalClosing,
}: Props) => {
  // Choose icon based on type
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(
        "absolute top-2 w-70 h-fit py-2 overflow-hidden right-2 z-10 shadow-lg rounded-lg bg-[#4A4A4A] px-3 flex items-center gap-2",
        {
          "popup-animation": !isModalClosing,
          "popclose-animation": isModalClosing,
        }
      )}
    >
      {/* Notification Icon */}
      {renderIcon()}

      {/* Notification Text */}
      <h5 className="text-xs font-medium">{label}</h5>

      {/* Close Button */}
      <button
        type="button"
        onClick={handleModalClosing}
        className="absolute top-2 right-2"
      >
        <XIcon className="cursor-pointer" size={12} />
      </button>

      {/* Timeout bar */}
      <span className="absolute left-0 bottom-0 block bg-white h-0.5 timeout-animation" />
    </div>
  );
};

export default NotificationModal;
