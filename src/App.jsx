import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { RecoilRoot } from "recoil";
import { Table } from "./Components/Table/Table";

function App() {
  return (
    <>
      <BalanceComponent />
      <RecoilRoot>
        <Table />
      </RecoilRoot>
    </>
  );
}

export default App;
