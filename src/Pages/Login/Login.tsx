import styled from "@emotion/styled";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../services/supabaseClient";
import { Button, Col, Input, Row } from "antd";

const Container = styled.div``;

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
  margin-top: 5vh;
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
        <Col offset={11} xl={2}>
          <Title>Login</Title>
        </Col>
      </TitleContainer>
      <DescriptionContainer>
        <Col offset={11} xl={2}>
          Faca seu login usando email
        </Col>
      </DescriptionContainer>
      <InputContainer>
        <Col span={4} offset={10}>
          <label>Entre seu email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Col>
      </InputContainer>
      <Row>
        <Col span={2} offset={11}>
          <Button onClick={handleLogin} disabled={loading} type="primary" block>
            Enviar email
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
