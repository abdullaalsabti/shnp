import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
