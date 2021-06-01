import React from "react";
// import { device } from "../theme/devices";

import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { ToggleButton } from "@material-ui/lab";

const StyledButton = styled(Button)({
  "@media (max-width:375px)": {
    padding: "8px 10px",
    fontSize: "13px",
  },
});
const StyledToggleButton = styled(ToggleButton)({
  background: "#7381d1",
  padding: "6px 16px",
  color: "#fff",
  "&:hover": {
    background: "#3f51b5",
    color: "#fff",
  },
  "@media (max-width:375px)": {
    padding: "8px 10px",
    fontSize: "13px",
  },
  // "&$disabled": {
  //   background: "#3f51b5",
  //   color: "white",
  // },
});

// const StyledButton = styled.button`
//   outline: none;
//   background: ${(props) => (props.selected ? "#d7eef7" : " #fff;")};
//   border: solid 1px #d3d8db;
//   cursor: pointer;
//   padding: 7px 15px;
//   border-radius: 5px;
//   color: #576063;
//   font-size: 1rem;
//   &:hover {
//     border: solid 1px #bbc1c4;
//     background: #d7eef7;
//   }

//   @media ${device.tablet} {
//     font-size: 1.1rem;
//     font-weight: 300;
//     padding: 11px 23px;
//   }

//   @media ${device.mobileL} {
//     font-size: 1.1rem;
//     font-weight: 300;
//     padding: 8px 16px;
//   }
//   @media ${device.mobileM} {
//     font-size: 1rem;
//     font-weight: 300;
//     padding: 6px 14px;
//   }
// `;

const ControlButton = ({ onClick, name, selected, closedButton, type }) => {
  let button = null;

  switch (type) {
    case "regular":
      button = (
        <StyledButton
          size="medium"
          variant="contained"
          color={closedButton ? "secondary" : "primary"}
          selected={selected}
          onClick={onClick}
        >
          {name}
        </StyledButton>
      );
      break;
    case "toggle":
      button = (
        <StyledToggleButton
          value="check"
          variant="contained"
          color={closedButton ? "secondary" : "primary"}
          selected={selected}
          onClick={onClick}
        >
          {name}
        </StyledToggleButton>
      );
      break;
    default:
      break;
  }
  return button;
};

export default ControlButton;
