import React, { useState } from "react";
import styled from "styled-components";

const DDa = styled.a``;

const DDli = styled.li``;

const DDul = styled.ul``;

const DDcontainerInner = styled.div``;

const DDcontainerOuter = styled.div``;

const DDexpandButton = styled.button``;

const DDpreview = styled.span``;

export const Dropdown = ({ name, list, selected, setSelected }) => {
  const [expanded, setExpanded] = useState();

  const handleOptionClick = option => {
    setSelected(option);
  };

  return (
    <DDcontainerOuter>
      {!expanded && (
        <DDpreview>{selected.map(selection => selection)}</DDpreview>
      )}
      <DDexpandButton onClick={() => setExpanded(!expanded)} />
      {expanded && (
        <DDcontainerInner>
          <DDul>
            {list.map((option, i) => (
              <DDli key={`option-${i}-in-list-${name}`}>
                <DDa onClick={() => handleOptionClick(option)}>{option}</DDa>
              </DDli>
            ))}
          </DDul>
        </DDcontainerInner>
      )}
    </DDcontainerOuter>
  );
};
