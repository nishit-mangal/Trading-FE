import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { RecoilRoot } from "recoil";
import { Table } from "./Components/Table/Table";
import { OrderHistoryBtn } from "./Components/OrderHistoryBtn/OrderHistoryBtn";
import { GenerateAccessCode } from "./Components/GenerateAccessCode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccessToken } from "./Components/AccessTokenPage";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/accessToken' element={<AccessToken />} />
        <Route 
        path='/' 
        element={<>
        <div className="data-class">
          <BalanceComponent />
          <OrderHistoryBtn />
          <GenerateAccessCode />
        </div>
        <RecoilRoot>
          <Table />
        </RecoilRoot>
        </>} 
        />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
