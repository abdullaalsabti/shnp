import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { RestaurantEmployee } from "../store/restaurantEmployeeTableSlice";

interface EmployeeTableProps {
  employees: RestaurantEmployee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const thCss = "px-6 py-3 text-center font-bold text-lg";
  const tdCss = "px-6 py-6 text-center font-bold";
  return (
    <div className="overflow-x-auto mt-4 mb-10">
      <table className="min-w-full text-sm text-left text-gray-500 border ">
        <thead className="text-xs text-white uppercase bg-orange-500">
          <tr>
            <th className={thCss}>Name</th>
            <th className={thCss}>Email</th>
            <th className={thCss}>Roles</th>
            <th className={thCss}>Status</th>
            <th className={thCss}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="bg-white transition even:hover:bg-red-50 odd:hover:bg-gray-100"
            >
              <td className={tdCss}>{emp.fullNameEn}</td>
              <td className={tdCss}>{emp.email}</td>
              <td className={tdCss}>
                {emp.roles.map((role) => `${role.name}`)}
              </td>
              <td
                className={
                  tdCss +
                  (!emp.accepted ? " text-yellow-500" : " text-green-600")
                }
              >
                {emp.accepted ? "Accepted" : "Pending"}
              </td>
              <td className={tdCss}>
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
