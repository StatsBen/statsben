import React from "react";

import {
  FilterByLink,
  FooterContainer,
  FooterDisclaimer,
  FooterVersionNo,
  MenuLink,
  MenuSection,
  MenuSectionHeader
} from "./MainMenuStyledCoponents";

import {
  Clearfix,
  CloseButton,
  ModalBackdrop,
  ModalContainer
  // ModalHeader
} from "./reusable-modal-components";

import packageJSON from "../../package.json";

const SuccessMessage = props => {
  const { types, activeFilters } = props;

  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={props.close}>X</CloseButton>

        <MenuSection>
          <MenuLink>About</MenuLink>
          <Clearfix />
          <MenuLink>Resume</MenuLink>
          <Clearfix />
        </MenuSection>

        <MenuSection>
          <MenuSectionHeader>Contact: </MenuSectionHeader>
          <MenuLink>Email</MenuLink>
          <MenuLink>LinkedIn</MenuLink>
          <MenuLink>Instagram</MenuLink>
          <Clearfix />
        </MenuSection>

        <MenuSection>
          <MenuSectionHeader>Filter By: </MenuSectionHeader>
          {types.map((type, i) => (
            <FilterByLink
              key={`filter-type-${i}`}
              className={activeFilters.includes(type) ? "active" : ""}
            >
              {type}
            </FilterByLink>
          ))}
          <Clearfix />
        </MenuSection>

        <FooterContainer>
          <FooterDisclaimer>
            All photos by Ben Clark unless otherwise noted.
          </FooterDisclaimer>
          <FooterVersionNo>v{packageJSON.version}</FooterVersionNo>
        </FooterContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default SuccessMessage;
