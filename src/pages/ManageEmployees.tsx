import React, { useEffect, useState } from "react";
import {
  useApplicationDispatch,
  useApplicationSelector,
} from "../store/storeHooks";
import { useTranslation } from "react-i18next";
import toast from "../../node_modules/react-hot-toast/src/index";
import { loadingActions } from "../store/loadingSlice";
import { restaurantEmployeeTableActions } from "../store/restaurantEmployeeTableSlice";
import Pagination from "../components/Pagination";
import EmployeeTable from "../components/EmployeeTable";
import Button from "../components/Buttons/Button";

const ITEMS_PER_PAGE = 10;

const ManageEmployees = () => {
  const dispatch = useApplicationDispatch();

  const data = useApplicationSelector(
    (state) => state.restaurantEmployeeTable.data
  );
  const authState = useApplicationSelector((state) => state.authState);

  const { i18n } = useTranslation();

  const currentPage = data ? data.offset / data.limit + 1 : 1;
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;
  const [page, setPage] = useState<number>(currentPage);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const [isAcceptedFilter, setIsAcceptedFilter] = useState<string | undefined>(
    undefined
  );

  //FETCH EMPLOYEES
  async function fetchEmployees(offset: number) {
    let additionalAcceptedParam = "";
    if (isAcceptedFilter === "accepted") {
      additionalAcceptedParam = "&accepted=true";
    } else if (isAcceptedFilter === "pending") {
      additionalAcceptedParam = "&accepted=false";
    }
    dispatch(loadingActions.setIsLoading());
    try {
      const response = await fetch(
        `https://app-stg.shnp.me/api/restaurantEmployees?locale=${i18n.language}&limit=${ITEMS_PER_PAGE}&offset=${offset}${additionalAcceptedParam}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${authState.token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("could not fetch table data");
      }

      dispatch(restaurantEmployeeTableActions.setData(data));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
        console.error(err);
      }
    } finally {
      dispatch(loadingActions.setIsNotLoading());
    }
  }

  useEffect(() => {
    fetchEmployees(offset);
    console.log(isAcceptedFilter);
  }, [page, isAcceptedFilter]);

  //COMPONENT
  return (
    <div className="flex flex-col justify-center">
      <form action="">
        <div className="flex gap-4">
          <select
            className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500 flex flex-row gap-3 max-w-50 text-center min-w-40"
            name="isAccepted"
            onChange={(event) =>
              setIsAcceptedFilter(
                event.target.value === "accepted" ? "accepted" : "pending"
              )
            }
            value={isAcceptedFilter}
          >
            <option value="" disabled hidden selected>
              Filter status...
            </option>
            <option value="accepted">accepted</option>
            <option value="pending">pending</option>
          </select>
          <Button
            inverted={true}
            additionalStyles="rounded-xl"
            onClick={() => setIsAcceptedFilter(undefined)}
          >
            clear
          </Button>
        </div>
      </form>

      {data ? (
        <EmployeeTable employees={data?.matches}></EmployeeTable>
      ) : (
        <p>NO DATA FOUND</p>
      )}

      <Pagination
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
        onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
        onNumberClick={(index) => setPage(index + 1)}
        page={page}
        totalPages={totalPages}
      ></Pagination>
    </div>
  );
};

export default ManageEmployees;
