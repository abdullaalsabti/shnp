import React from "react";
import type { WorkingDetailsModel } from "../utils/formikUtils";

import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./Buttons/IconButton";
import { numberToDay } from "../utils/numberToDay";

type WorkHourCardProps = {
  workDetails: WorkingDetailsModel[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const WorkHourCards: React.FC<WorkHourCardProps> = ({
  workDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      {workDetails.map((detail, idx) => {
        return (
          <div
            className="m-1 mt-3 shadow-xl rounded-2xl bg-amber-50 py-4 px-6 flex flex-row justify-between font-bold"
            key={detail.from}
          >
            <div>
              <p>Day : {numberToDay(detail.day)}</p>
              <p>From : {detail.from}</p>
              <p>To : {detail.to}</p>
            </div>
            <div>
              <IconButton
                icon={faEdit}
                size="xl"
                onClick={() => onEdit(idx)}
              ></IconButton>
              <IconButton
                icon={faTrash}
                size="xl"
                additionalStyles="ml-3"
                onClick={() => {
                  onDelete(idx);
                }}
              ></IconButton>
            </div>
          </div>
        );
      })}
    </div>
    //
  );
};

export default WorkHourCards;
