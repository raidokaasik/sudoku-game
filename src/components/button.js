import React from "react";
import { device } from "../theme/devices";
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

  @media ${device.tablet} {
    font-size: 1.1rem;
    font-weight: 300;
    padding: 11px 23px;
  }

  @media ${device.mobileL} {
    font-size: 1.1rem;
    font-weight: 300;
    padding: 8px 16px;
  }
  @media ${device.mobileM} {
    font-size: 1rem;
    font-weight: 300;
    padding: 6px 14px;
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
