import React from "react";
import styled from "styled-components";
import { TypeButton } from "./InputComponents";
import { Dropdown } from "./Dropdown";

// const controlsProps = {
//   activeRangeFilters,
//   activeTypeFilters,
//   ranges,
//   types,
//   setActiveRangeFilters,
//   setActiveTypeFilters
// };

const TypesControlsContainer = styled.div``;

const Controls = props => {
  const {
    activeRangeFilters,
    activeTypeFilters,
    ranges,
    setActiveRangeFilters,
    setActiveTypeFilters,
    types
  } = props;

  if (!types || !activeTypeFilters)
    return <div>... not sure what the types are yet...</div>;

  let className;

  const handleTypeClick = type => {
    if (!type) return;

    if (activeTypeFilters.length > 2) {
      setActiveTypeFilters([type]);
    } else if (activeTypeFilters.length == 2) {
      if (activeTypeFilters.includes(type)) {
        setActiveTypeFilters(activeTypeFilters.filter(t => t !== type));
      }
    } else {
      if (activeTypeFilters.includes(type)) {
        setActiveTypeFilters(activeTypeFilters.filter(t => t !== type));
      } else {
        setActiveTypeFilters([...activeTypeFilters, type]);
      }
    }
  };

  const rangeSelectProps = {
    name: "range-select",
    list: ranges,
    selected: activeRangeFilters,
    setSelected: setActiveRangeFilters
  };

  return (
    <div>
      <TypesControlsContainer>
        {types.map(type => {
          className = "";

          if (activeTypeFilters.includes(type)) {
            className += "active";
          }

          return (
            <TypeButton
              className={className}
              key={`button-for-type-${type}`}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </TypeButton>
          );
        })}
      </TypesControlsContainer>
      <Dropdown {...rangeSelectProps} />
    </div>
  );
};

export default Controls;
