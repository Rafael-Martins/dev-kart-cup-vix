import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Login } from "./Pages/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { setConfiguration } from "react-grid-system";
import { Profile } from "./Pages/Profile";

setConfiguration({ gridColumns: 24, gutterWidth: 10 });

type SessionType = Session | null;

const LoggedRoute = ({
  children,
  session,
}: {
  children: JSX.Element;
  session: SessionType;
}) => {
  const location = useLocation();
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const [session, setSession] = useState<SessionType>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={session ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/profile"
          element={
            <LoggedRoute session={session}>
              <Profile session={session} />
            </LoggedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
