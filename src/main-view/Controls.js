import React from "react";
import { RangesSelector, TypeButton } from "./InputComponents";
import {
  ControlsContainer,
  ControlInputContainer,
  ControlInput,
  ControlLabel
} from "./ControlComponents";

const Controls = props => {
  const {
    activeTypeFilters,
    ranges,
    setactiveRangeFilter,
    setActiveTypeFilters,
    types
  } = props;

  if (!types || !activeTypeFilters) return <div>loading controls...</div>;

  const handleTypeClick = type => {
    if (activeTypeFilters.includes(type)) {
      setActiveTypeFilters([]);
    } else {
      setActiveTypeFilters([type]);
    }
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
              onChange={value => setactiveRangeFilter(value ? value.value : "")}
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
