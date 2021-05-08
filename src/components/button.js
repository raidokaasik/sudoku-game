import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  background: ${(props) => (props.selected ? "#d7eef7" : " #fff;")};
  border: solid 1px #d3d8db;
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 5px;
  color: #576063;
  font-size: 1rem;
  &:hover {
    border: solid 1px #bbc1c4;
    background: #d7eef7;
  }

  @media (max-width: 860px) {
    font-size: 1.2rem;
    font-weight: 300;
    padding: 12px 22px;
  }

  @media (max-width: 630px) {
    font-size: 1.2rem;
    font-weight: 300;
    padding: 12px 22px;
  }
`;

const Button = ({ onClick, name, selected }) => {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {name}
    </StyledButton>
  );
};

export default Button;
