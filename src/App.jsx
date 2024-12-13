import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { RecoilRoot } from "recoil";
import { Table } from "./Components/Table/Table";
import { OrderHistoryBtn } from "./Components/OrderHistoryBtn/OrderHistoryBtn";
import { GenerateAccessCode } from "./Components/GenerateAccessCode";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AccessToken } from "./Components/AccessTokenPage";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import { Login } from "./Components/Login";
import { Protected } from "./Components/Protected";
import { SetPin } from "./Components/SetPin";
import { Logout } from "./Components/Logout";

const LoginRoutes = () => {
  return (
    <Outlet />
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/accessToken" element={<AccessToken />} />
          <Route path="/login" element={<LoginRoutes />}>
            <Route path="setPin" element={<SetPin />} />
            <Route path="enterPin" element={<SetPin />} />
          </Route>

          <Route
            path="/"
            element={
              <Protected>
                <>
                  <div className="data-class">
                    <BalanceComponent />
                    <OrderHistoryBtn />
                    <GenerateAccessCode />
                    <Logout />
                  </div>
                  <RecoilRoot>
                    <Table />
                  </RecoilRoot>
                </>
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
