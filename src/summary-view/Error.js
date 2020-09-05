import React from "react";
import styled from "styled-components";

const ErrorTitle = styled.div`
  color: red;
`;

const Error = ({ ...error }) => {
  return (
    <div>
      <ErrorTitle>{error.toString()}</ErrorTitle>
    </div>
  );
};

export default Error;
