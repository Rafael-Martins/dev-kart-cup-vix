import styled from "@emotion/styled";
import React, { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import toast from "react-hot-toast";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { supabase } from "../../services/supabaseClient";

const Title = styled.h1`
  font-size: 66px;
  margin-bottom: 6px;
  text-align: center;
`;

const DescriptionContainer = styled.div`
  text-align: center;
  margin-bottom: 44px;
`;

const TitleContainer = styled(Row)`
  margin-top: 60px;
`;

const InputContainer = styled(Row)`
  margin-bottom: 6px;
`;

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const tryToLogin = async () => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signIn({ email });
        if (error) throw error;
      } catch (error: any) {
        throw error.error_description || error.message;
      } finally {
        setLoading(false);
      }
    };

    toast.promise(tryToLogin(), {
      success: "Verifique o link no seu email (pode ta no spam :D)",
      loading: "Enviando link pro seu email",
      error: "Ocorreu um erro :(",
    });
  };

  return (
    <Container>
      <TitleContainer>
        <Col lg={6} offset={{ lg: 9 }}>
          <Title>Login</Title>
        </Col>
      </TitleContainer>
      <DescriptionContainer>
        <Col lg={6} offset={{ lg: 9 }}>
          Faca login usando apenas seu email
        </Col>
      </DescriptionContainer>
      <InputContainer>
        <Col lg={6} offset={{ lg: 9 }}>
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Col>
      </InputContainer>
      <Row>
        <Col lg={4} offset={{ lg: 10 }}>
          <Button onClick={handleLogin} disabled={loading} kind="primary">
            Enviar email
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
