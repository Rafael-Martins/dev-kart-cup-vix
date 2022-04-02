import styled from "@emotion/styled";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import toast from "react-hot-toast";

import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { ErrorMessages } from "../../constants";
import { supabase } from "../../services/supabaseClient";
import { H1, H3, HeaderRow } from "../Styled";

type ProfileProps = {
  session: Session | null;
};

type ProfileData = {
  username?: string;
  pdf_name?: string;
  id?: string;
};

const EmailRow = styled(Row)`
  text-align: center;
  margin-bottom: 60px;
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
  margin-bottom: 10px;
`;

const signOut = () => supabase.auth.signOut();

const Profile = ({ session }: ProfileProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  const saveProfileData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<ProfileData>("profiles")
      .upsert([
        {
          id: user?.id,
          username: profile?.username,
          pdf_name: profile?.pdf_name,
        },
      ]);
    if (data) {
      toast.success(ErrorMessages.CHANGE_SUCESSFUL);
      setLoading(false);
    }
    if (error) {
      toast.error(ErrorMessages.DEFAULT_MESSAGE);
      setLoading(false);
    }
  };

  const getProfileData = async (userData: User | null) => {
    setLoading(true);
    const { data: profileData, error } = await supabase
      .from<ProfileData>("profiles")
      .select()
      .eq("id", userData?.id);
    if (profileData) {
      setProfile(profileData[0]);
      setLoading(false);
    }
    if (error) {
      toast.error(ErrorMessages.DEFAULT_MESSAGE);
      setLoading(false);
    }
  };

  const updateProfileValue = (key: keyof ProfileData, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  useEffect(() => {
    const fetchData = () => {
      const userData = supabase.auth.user();
      setUser(userData);
      getProfileData(userData);
    };

    fetchData();
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
          <Button kind="error" onClick={signOut} disabled={loading}>
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
          <Input
            label="Nome de exibição"
            value={profile?.username || ""}
            disabled={loading}
            onChange={({ target: { value } }) =>
              updateProfileValue("username", value)
            }
          />
        </Col>
      </FormItemRow>

      <FormItemRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <Input
            label="Nome no pdf"
            value={profile?.pdf_name || ""}
            disabled={loading}
            onChange={({ target: { value } }) =>
              updateProfileValue("pdf_name", value)
            }
          />
        </Col>
      </FormItemRow>

      <FormItemRow>
        <Col lg={6} offset={{ lg: 9 }}>
          <Button kind="success" onClick={saveProfileData}>
            Salvar
          </Button>
        </Col>
      </FormItemRow>
    </Container>
  );
};

export default Profile;
