import { useState } from "react";
import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { Stocks } from "./Components/Stocks/Stocks";

function App() {
  return (
    <>
      <BalanceComponent />
      <Stocks />
    </>
  );
}

export default App;
