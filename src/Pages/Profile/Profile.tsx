import styled from "@emotion/styled";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";

import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { supabase } from "../../services/supabaseClient";
import { H1, H3, HeaderRow } from "../Styled";

type ProfileProps = {
  session: Session | null;
};

const EmailRow = styled(Row)`
  text-align: center;
  margin-top: 7px;
`;

const TextCenterRow = styled(Row)`
  text-align: center;
`;

const EditProfileTitleRow = styled(TextCenterRow)`
  margin-bottom: 30px;
`;

const FormItemRow = styled(Row)`
  margin-bottom: 15px;
`;

const LogoutRow = styled(Row)`
  margin-bottom: 60px;
`;

const signOut = supabase.auth.signOut;

const Profile = ({ session }: ProfileProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);
    console.log(user);
  }, []);

  return (
    <Container>
      <HeaderRow>
        <Col lg={6} offset={{ lg: 9 }}>
          Perfil
        </Col>
      </HeaderRow>

      <EmailRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <H3>{user?.email}</H3>
        </Col>
      </EmailRow>

      <LogoutRow>
        <Col lg={2} offset={{ lg: 11 }}>
          <Button kind="error" onClick={signOut}>
            Deslogar
          </Button>
        </Col>
      </LogoutRow>

      <EditProfileTitleRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <H1>Editar perfil publico</H1>
        </Col>
      </EditProfileTitleRow>

      <FormItemRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <Input label="Nome de exibição" />
        </Col>
      </FormItemRow>

      <FormItemRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <Input label="Nome no pdf" />
        </Col>
      </FormItemRow>
    </Container>
  );
};

export default Profile;
