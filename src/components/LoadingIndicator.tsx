import React from "react";
import { TrophySpin } from "react-loading-indicators";

const LoadingIndicator = () => {
  return (
    <div className=" absolute top-1/2 left-1/2 z-10 bg-white/60 backdrop-blur-xl flex flex-row justify-center items-center">
      <TrophySpin
        color="#ff7c11"
        size="large"
        text="submitting..."
        textColor="#000000"
      />
    </div>
  );
};
export default LoadingIndicator;
