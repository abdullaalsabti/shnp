import React from "react";
import { TrophySpin } from "react-loading-indicators";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 backdrop-blur-xl flex flex-row justify-center items-center bg-none">
      <TrophySpin color="#ff7c11" size="large" textColor="#000000" />
    </div>
  );
};
export default LoadingIndicator;
