import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

type InformationCardProps = {
  title: string;
  number: number;
};

const InformationCard: React.FC<InformationCardProps> = (props) => {
  const { i18n } = useTranslation();

  return (
    <div className="shadow-xl rounded min-w-52, min-h-52 flex flex-col justify-between px-8 py-2 rounded-3xl m-4">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold">{props.title}</h3>
        <button>
          <FontAwesomeIcon
            icon={i18n.language === "en" ? faChevronRight : faChevronLeft}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-5xl text-orange-500 font-bold">
          {props.number}
        </span>
        <p className="font-bold text-gray-400">subscriptions</p>
      </div>
    </div>
  );
};

export default InformationCard;
