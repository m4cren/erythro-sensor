import { useState } from "react";

export const usePopupModal = ({ expirable }: { expirable: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalClosing, setIsModalClosing] = useState<boolean>(false);
  const handleModalClosing = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalClosing(false);
      setIsModalOpen(false);
    }, 95);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    if (expirable) {
      setTimeout(() => {
        handleModalClosing();
      }, 7950);
    }
  };

  return { isModalClosing, isModalOpen, handleModalClosing, handleModalOpen };
};
