import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { RecoilRoot } from "recoil";
import { Table } from "./Components/Table/Table";
import { OrderHistoryBtn } from "./Components/OrderHistoryBtn/OrderHistoryBtn";

function App() {
  return (
    <>
      <div className="data-class">
        <BalanceComponent />
        <OrderHistoryBtn />
      </div>
      <RecoilRoot>
        <Table />
      </RecoilRoot>
    </>
  );
}

export default App;
