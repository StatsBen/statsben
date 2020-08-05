import React from "react";
// import styled from "styled-components";

import {
  CloseButton,
  ModalBackdrop,
  ModalContainer,
  ModalHeader
} from "./reusable-modal-components";

const SuccessMessage = props => {
  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={props.close}>X</CloseButton>
        <ModalHeader>This menu has not been implemented yet...</ModalHeader>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default SuccessMessage;
