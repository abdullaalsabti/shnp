import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Buttons/Button";

interface ExternalLinkInputProps {
  label: string;
  link: string;
  name: string;
  required: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; //to be used later?
  overlay: string;
}

const ExternalLinkInput: React.FC<ExternalLinkInputProps> = (props) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <label htmlFor={props.name}>
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>
      <Button onClick={props.onClick}>
        <FontAwesomeIcon icon={faPlus} size="1x"></FontAwesomeIcon>
      </Button>
    </div>
  );
};

export default ExternalLinkInput;
