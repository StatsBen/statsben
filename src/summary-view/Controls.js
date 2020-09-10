import React from "react";
import styled from "styled-components";
import { RangesSelector, TypeButton } from "./InputComponents";
import { globals } from "../globals";

const ControlsContainer = styled.div`
  width: calc(100% - 60px);
  margin: 20px 50px;
  border-bottom: thin solid ${globals.colours.lighterGray};
`;

const ControlInputContainer = styled.div`
  display: flex;
  padding: 30px 0;
`;

const ControlLabel = styled.span`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
`;

const ControlInput = styled.span`
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

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

  return (
    <ControlsContainer>
      <ControlInputContainer>
        <ControlLabel>Filter by type: </ControlLabel>
        <ControlInput>
          {types.map(type => (
            <TypeButton
              className={activeTypeFilters.includes(type) ? "active" : ""}
              key={`button-for-type-${type}`}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </TypeButton>
          ))}
        </ControlInput>
      </ControlInputContainer>
      <ControlInputContainer>
        <ControlLabel>Filter by range/region: </ControlLabel>
        <ControlInput>
          {ranges && ranges.length && (
            <RangesSelector
              isClearable={true}
              options={rangeOptions}
              onChange={value =>
                setActiveRangeFilters(value ? value.value : "")
              }
            />
          )}
        </ControlInput>
      </ControlInputContainer>
    </ControlsContainer>
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
