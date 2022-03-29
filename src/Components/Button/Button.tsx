import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import { colors } from "../../theme/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "success" | "error";
}

type StyledButtonProps = {
  bgColor?: string;
  textColor?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  height: 40px;
  width: 100%;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`;

const Button = (props: ButtonProps) => {
  const { kind = "primary" } = props;

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
    />
  );
};

export default Button;
