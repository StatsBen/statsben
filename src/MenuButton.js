import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  background: #333333;
  padding: 15px 20px;
  border-radius: 0 0 10px 10px;
`;

const ButtonText = styled.a`
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  border-bottom: thin solid #dddddd;
`;

const MenuButtons = props => {
  const clickHandler = event => {
    const { showMenu } = props;
    event.preventDefault();
    showMenu();
  };

  return (
    <Container>
      <ButtonText onClick={clickHandler}>Menu</ButtonText>
    </Container>
  );
};

export default MenuButtons;
