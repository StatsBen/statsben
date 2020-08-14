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

const MainMenu = props => {
  const { about, activeFilters, addFilter, removeFilter, types } = props;

  const handleFilterClick = type => {
    if (activeFilters.includes(type)) {
      removeFilter(type);
    } else {
      addFilter(type);
    }
    props.close();
  };

  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={props.close}>X</CloseButton>

        <MenuSection>
          <MenuLink onClick={about}>About</MenuLink>
          <Clearfix />
          <MenuLink target="_blank" href={"http://statsben.github.io/"}>Resume</MenuLink>
          <Clearfix />
        </MenuSection>

        <MenuSection>
          <MenuSectionHeader>Contact: </MenuSectionHeader>
          <MenuLink onClick={() => alert("ben.clark456@gmail.com")}>
            Email
          </MenuLink>
          <MenuLink target="_blank" href={"https://www.linkedin.com/in/ben-clark-970907101/"}>
            LinkedIn
          </MenuLink>
          <MenuLink target="_blank" href={"https://www.instagram.com/splittercracks/"}>
            Instagram
          </MenuLink>
          <Clearfix />
        </MenuSection>

        <MenuSection>
          <MenuSectionHeader>Filter By: </MenuSectionHeader>
          {types.map((type, i) => (
            <FilterByLink
              key={`filter-type-${i}`}
              className={activeFilters.includes(type) ? "active" : ""}
              onClick={() => {
                handleFilterClick(type);
              }}
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

export default MainMenu;
