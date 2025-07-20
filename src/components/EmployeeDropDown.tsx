import React from "react";
import { DropdownMenu } from "radix-ui";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EmployeeDropDownProps = {
  isPending: boolean;
  onUpdateEmployee: () => void;
  toggleModal: () => void;
};

const EmployeeDropDown: React.FC<EmployeeDropDownProps> = ({ isPending , toggleModal, onUpdateEmployee}) => {
  const itemCss = "my-2 hover:bg-gray-500 p-3 hover:text-white font-bold hover:cursor-pointer";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={true}>
        <button>
          <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5} className="bg-gray-50">
          <DropdownMenu.Item className={itemCss} onClick={toggleModal}>
            Update Employee
          </DropdownMenu.Item>
          {isPending && (
            <DropdownMenu.Item className={itemCss}>
              Resend Invitation
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default EmployeeDropDown;
