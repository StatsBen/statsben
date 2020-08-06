import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(1em + 60px);
  right: 0;
  left: 0;
  bottom: 0;
  padding: 10px 0 0 0;
  color: #000000;
  text-align: center;
  word-spacing: 2em;
  background: #ffffff;
`;

const Butt = styled.a`
  font-weight: 100;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

const PaginationCarousel = ({ nPages, page, next, prev }) => {
  const handleNextClick = event => {
    event.preventDefault();
    next();
  };

  const handlePreviousClick = event => {
    event.preventDefault();
    prev();
  };

  return (
    <Container>
      <Butt onClick={handlePreviousClick}>prev</Butt>
      <span>{`    (${page || "..."}/${nPages || "..."})    `}</span>
      <Butt onClick={handleNextClick}>next</Butt>
    </Container>
  );
};

export default PaginationCarousel;
