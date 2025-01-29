import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AccessToken } from "./Components/AccessTokenPage";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import { Login } from "./Components/Login";
import { Protected } from "./Components/Protected";
import { SetPin } from "./Components/SetPin";
import { MainPage } from "./Components/MainPage";
import { RecoilRoot } from "recoil";
import { ForgotPassword } from "./Components/ForgetPassword";
import { PageNotFound } from "./Components/PageNotFound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "./constants.js";


const LoginRoutes = () => {
  return <Outlet />;
};

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/accessToken" element={<AccessToken />} />
            <Route
              path="/forgotPassword/:userId/:token"
              element={<ForgotPassword />}
            />
            <Route path="/login" element={<LoginRoutes />}>
              <Route path="setPin" element={<SetPin />} />
              <Route path="enterPin" element={<SetPin />} />
            </Route>
            <Route
              path="/"
              element={
                <RecoilRoot>
                  <Protected>
                    <MainPage />
                  </Protected>
                </RecoilRoot>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
