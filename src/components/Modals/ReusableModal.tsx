import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type ReusableModalProps = {
  onClose: () => void;
  modalIsOpen: boolean;
  children: React.ReactNode;
  className?: string;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  onClose,
  modalIsOpen,
  children,
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (modalIsOpen && !dialog.open) {
      dialog.showModal();
    } else if (!modalIsOpen && dialog.open) {
      dialog.close();
    }
  }, [modalIsOpen]);

  const handleClose = () => {
    onClose();
  };

  const modalRoot = document.querySelector("#modal");
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className={` rounded-xl p-6 min-w-3xl max-w-lg bg-white shadow-lg backdrop:bg-black/50 shadow-2xl m-auto flex flex-col justify-center${className}`}
    >
      {children}
    </dialog>,
    modalRoot
  );
};

export default ReusableModal;
