import styled from "@emotion/styled";
import { Col, Row } from "react-grid-system";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Navbar } from "../../Components/Navbar";
import { supabase } from "../../services/supabaseClient";
import { HeaderRow } from "../Styled";

const SubTitleRow = styled(Row)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 60px;
`;

const LoginButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 40px;
  width: 100px;
`;

const Home = () => {
  const navigate = useNavigate();
  const isLogged = Boolean(supabase.auth.user);
  const goToLogin = () => navigate(isLogged ? "/profile" : "/login");

  return (
    <>
      <HeaderRow>
        <Col>VIX DEV'S</Col>
      </HeaderRow>
      <SubTitleRow>
        <Col lg={4} offset={{ lg: 10 }}>
          Grande Premio de Kart
        </Col>
      </SubTitleRow>
      <Row>
        <Col lg={8} offset={{ lg: 8 }}>
          <Navbar />
        </Col>
      </Row>

      <LoginButtonContainer>
        <Button kind="secondary" noBorderRadius onClick={goToLogin}>
          {isLogged ? "Profile" : "Login"}
        </Button>
      </LoginButtonContainer>
    </>
  );
};

export default Home;
