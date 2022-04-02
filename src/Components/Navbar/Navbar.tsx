import styled from "@emotion/styled";
import { Button } from "../Button";

const NavbarContainer = styled.div`
  display: flex;
`;

const NavButton = styled(Button)`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 5px;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavButton kind="secondary" noBorderRadius>
        Historico de corridas
      </NavButton>
      <NavButton kind="secondary" noBorderRadius>
        Eventos
      </NavButton>
      <NavButton kind="secondary" noBorderRadius>
        Regras
      </NavButton>
    </NavbarContainer>
  );
};

export default Navbar;
