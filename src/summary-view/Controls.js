import React from "react";
import styled from "styled-components";
import { RangesSelector, TypeButton } from "./InputComponents";

const TypesControlsContainer = styled.div``;

const Controls = props => {
  const {
    activeTypeFilters,
    ranges,
    setActiveRangeFilters,
    setActiveTypeFilters,
    types
  } = props;

  if (!types || !activeTypeFilters) return <div>loading controls...</div>;

  const handleTypeClick = type => {
    typeFilterSelectReducer(activeTypeFilters, setActiveTypeFilters, type);
  };

  const rangeOptions = formatRangesHelper(ranges);

  let className;

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
      {ranges && ranges.length && (
        <RangesSelector
          isClearable={true}
          options={rangeOptions}
          onChange={value => setActiveRangeFilters(value ? value.value : "")}
        />
      )}
    </div>
  );
};

export default Controls;

const formatRangesHelper = ranges =>
  ranges
    ? ranges.map((range, i) => ({
        id: `range-option-${i}`,
        value: range,
        label: range
      }))
    : [];

const typeFilterSelectReducer = (
  activeTypeFilters,
  setActiveTypeFilters,
  type
) => {
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
