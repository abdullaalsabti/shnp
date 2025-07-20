import React from "react";
import InformationCard from "../components/InformationCard";
import toTitleCase from "../utils/toTitleCase";
import { useApplicationSelector } from "../store/storeHooks";
import splitAtCapitalLetter from "../utils/splitAtCapitalLetter";

const Dashboard = () => {
  const counts = useApplicationSelector((state) => state.restaurantCounts);
  let content = <></>;
  if (counts.restaurantCounts) {
    console.log(Object.entries(counts.restaurantCounts));
    content = (
      <>
        {Object.entries(counts.restaurantCounts).map(([key, value]) => (
          <InformationCard
            key={key}
            title={toTitleCase(splitAtCapitalLetter(key))}
            number={value}
          />
        ))}
      </>
    );
  }
  return <div className="grid grid-cols-1 md:grid-cols-2">{content}</div>;
};

export default Dashboard;
