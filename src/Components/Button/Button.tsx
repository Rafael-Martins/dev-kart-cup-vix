import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import { colors } from "../../theme/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "success" | "error";
  noBorderRadius?: boolean;
}

type StyledButtonProps = {
  bgColor?: string;
  textColor?: string;
  noBorderRadius?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  height: 40px;
  width: 100%;
  border: 0;
  border-radius: ${({ noBorderRadius }) => (noBorderRadius ? "0px" : "2px")};
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  :hover {
    opacity: 85%;
  }
`;

const Button = (props: ButtonProps) => {
  const { kind = "primary", noBorderRadius } = props;

  const getFontColor = () => {
    switch (kind) {
      case "primary":
      case "error":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <StyledButton
      {...props}
      bgColor={colors[kind]}
      textColor={colors[getFontColor()]}
      noBorderRadius={noBorderRadius}
    />
  );
};

export default Button;
