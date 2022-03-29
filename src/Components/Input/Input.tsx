import { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { colors } from "../../theme/theme";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SyledInput = styled.input`
  height: 28px;
  display: block;
  width: 100%;
  border: 0;
  border-radius: 2px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
`;

const StyledLabel = styled.label`
  font-size: 20px;
`;

const Input = (props: InputProps) => {
  const { label } = props;
  return (
    <>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <SyledInput {...props} />
    </>
  );
};

export default Input;
