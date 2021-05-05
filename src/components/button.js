import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  background: #fff;
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
`;

const Button = ({ onClick, name }) => {
  return <StyledButton onClick={onClick}>{name}</StyledButton>;
};

export default Button;
