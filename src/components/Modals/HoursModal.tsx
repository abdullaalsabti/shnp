import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReusableModal from "./ReusableModal";
import Button from "../Buttons/Button";
import type {
  FormikFormValues,
  WorkingDetailsModel,
} from "../../utils/formikUtils";
import { numberToDay } from "../../utils/numberToDay";
import type { FormikProps } from "formik";
import validateWorkingDetail from "../../utils/validateWorkingDetails";
import { dayToNumber } from "../../utils/dayToNumber";
import getRandomId from "../../utils/getRandomId";

type HoursModalProps = {
  onClose: () => void;
  onSave: (day: string, fromHour: string, toHour: string) => void;
  modalIsOpen: boolean;
  workingHoursInstance: WorkingDetailsModel | null;
  formik: FormikProps<FormikFormValues>;
};

const HoursModal: React.FC<HoursModalProps> = (props) => {
  const [date, setDate] = useState<{
    day: string;
    fromHour: string;
    toHour: string;
    id: number;
    errors: string[];
  }>({
    day: numberToDay(props.workingHoursInstance?.day ?? 0),
    fromHour: props.workingHoursInstance?.from ?? "09:00",
    toHour: props.workingHoursInstance?.to ?? "17:00",
    id: props.workingHoursInstance?.id ?? getRandomId(),
    errors: [],
  });

  const { onClose, modalIsOpen } = props;

  const hourInputCss = "px-2 py-1 font-medium border-b-1 border-b-gray-500";
  const labelCss = "text-stone-800 font-bold italic mr-1";

  console.log("received working detail: ", props.workingHoursInstance);

  function handleSaveInputs() {
    props.formik.setFieldValue("longitude", 31.9522);
    props.formik.setFieldValue("latitude", 35.9375);
    const currentEntry: WorkingDetailsModel = {
      day: dayToNumber(date.day),
      from: date.fromHour,
      to: date.toHour,
      fromHour: parseInt(date.fromHour),
      toHour: parseInt(date.toHour),
      id: date.id,
      restaurantId: 0,
    };
    const existingWorkDetails = [
      ...props.formik.values.workingDetails,
      currentEntry,
    ];
    const errors = validateWorkingDetail(
      currentEntry,
      existingWorkDetails ?? []
    );

    console.log(`errors: ${errors}`);

    if (errors.length === 0) {
      console.log("saving");
      props.onSave(date.day, date.fromHour, date.toHour);
      props.onClose();
      return;
    }

    setDate((prev) => ({ ...prev, errors: errors }));
  }

  return (
    <ReusableModal onClose={onClose} modalIsOpen={modalIsOpen}>
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-orange-400 text-2xl font-bold ">
          {props.workingHoursInstance === null
            ? "Add New Working Details"
            : "Edit Working Details"}
        </h2>
        <button
          type="button"
          className="text-orange-400 border-3 rounded-4xl border-orange-400 py-1 px-2"
          onClick={props.onClose}
        >
          <FontAwesomeIcon icon={faX} size="1x"></FontAwesomeIcon>
        </button>
      </div>
      <div className="h-0.25 bg-stone-400/40 mb-3"></div>
      <div className="font-medium text-xl">
        If your shift starts in the morning and ends after midnight, you need to
        divide it into two shifts: The first shift: Starts at x:xx AM. Ends at
        11:59 PM. The second shift: Starts at 12:00 AM (midnight). Ends at x:xx
        AM.
      </div>
      <div className="flex flex-row justify-evenly items-center mt-4">
        <div>
          <label htmlFor="day" className={labelCss}>
            Day:
          </label>
          <select
            name="day"
            id="day"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDate((prev) => ({ ...prev, day: e.target.value }));
            }}
            className={hourInputCss}
            value={date.day}
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
          </select>
        </div>
        <div>
          <label htmlFor="hourFrom" className={labelCss}>
            From:
          </label>
          <input
            type="time"
            name="hourFrom"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDate((prev) => ({ ...prev, fromHour: e.target.value }));
            }}
            className={hourInputCss}
            value={date.fromHour}
          />
        </div>
        <div>
          <label htmlFor="hourTO" className={labelCss}>
            To:
          </label>
          <input
            type="time"
            name="hourTo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDate((prev) => ({ ...prev, toHour: e.target.value }));
            }}
            className={hourInputCss}
            value={date.toHour}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        {date.errors.map((error) => (
          <p key={error} className="text-red-500 font-medium my-0.5">
            {error}
          </p>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center mt-8">
        <Button
          onClick={props.onClose}
          inverted={true}
          type="button"
          additionalStyles="px-20 py-3 mr-4"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveInputs}
          inverted={false}
          type="button"
          additionalStyles="px-20 py-3"
        >
          Save
        </Button>
      </div>
    </ReusableModal>
  );
};

export default HoursModal;
