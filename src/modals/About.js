import React from "react";
import styled from "styled-components";
import { colours } from "../globals/colours";
import { fonts } from "../globals/fonts";

import {
  Clearfix,
  CloseButton,
  ModalBackdrop,
  ModalContainer,
  ModalHeader
} from "./reusable-modal-components";

const headshotLink = `https://firebasestorage.googleapis.com/v0/b/adventures-41a04.appspot.com/o/images%2F50920387_10213129485099123_7818371419812659200_o.jpg?alt=media&token=cc8d0586-44a6-4ca9-b64b-d8b6eacd8ace`;

const Headshot = styled.img`
  float: none;
  clear: both;
  width: 80%;
  margin: 50px 5%;
  max-width: 800px;
`;

const Description = styled.div`
  float: none;
  clear: both;
  max-width: 600px;
  margin: 50px 5%;
  font-family: ${fonts.accent};
  color: ${colours.darkGray};
`;

const AltClose = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  color: black;
  font-family: ${fonts.accent};
  text-decoration: underline;
  &:hover {
    color: ${colours.accentBlue};
    cursor: pointer;
  }
`;

const AboutModal = props => {
  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={props.close}>X</CloseButton>

        <ModalHeader>About</ModalHeader>

        <Description>
          <p>
            Hello, my name is Ben. Welcome to my website! It’s a brief log of
            things I’ve done — mostly climbing-related.
          </p>
          <p>
            I currently live in Revelstoke, BC and work for the Canadian
            Avalanche Association. You can usually find my skiing or climbing
            around town or up at Rogers Pass.
          </p>
        </Description>

        <Headshot src={headshotLink} alt="A photo of me smiling strangely" />

        <Clearfix />

        <AltClose onClick={props.close}>close</AltClose>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default AboutModal;
