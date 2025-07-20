import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../Buttons/Button";
type ReusableModalProps = {
  onClose: () => void;
  modalIsOpen: boolean;
  children: React.ReactNode;
  className?: string;
  title: string;
  onSave: () => void;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  onClose,
  onSave,
  modalIsOpen,
  children,
  className = "",
  title,
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
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-orange-400 text-2xl font-bold ">{title}</h2>
        <button
          type="button"
          className="text-orange-400 border-3 rounded-4xl border-orange-400 py-1 px-2"
          onClick={() => {
            onClose();
          }}
        >
          <FontAwesomeIcon icon={faX} size="1x"></FontAwesomeIcon>
        </button>
      </div>
      <div className="h-0.25 bg-stone-400/40 mb-3"></div>

      {children}

      <div className="flex flex-row items-center justify-center mt-8">
        <Button
          onClick={() => {
            onClose();
          }}
          inverted={true}
          type="button"
          additionalStyles="px-20 py-3 mr-4"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          inverted={false}
          type="button"
          additionalStyles="px-20 py-3"
        >
          Save
        </Button>
      </div>
    </dialog>,
    modalRoot
  );
};

export default ReusableModal;
