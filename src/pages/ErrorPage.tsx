import React from "react";

const ErrorPage: React.FC<{ errorMsg: string; errorStatus: number }> = (
  props
) => {
  return (
    <>
      <h1>You Encountered An Error!</h1>
      <h3>Error Code: {props.errorStatus}</h3>
      <p>{props.errorMsg}</p>
    </>
  );
};

export default ErrorPage;
