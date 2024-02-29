import { useEffect, useState } from "react";
import { handleApiToGetAccountBalance } from "../../apiHandler";
import "./BalanceComponent.css";

export const BalanceComponent = () => {
  const [fundObj, setFundObj] = useState({
    availableFunds: 0,
    usedFunds: 0,
  });
  const balanceInfo = async () => {
    let response = await handleApiToGetAccountBalance();
    if (!response) {
      alert("Unable to fetch balance. Please try again later");
      return;
    }
    setFundObj(response);
  };
  useEffect(() => {
    balanceInfo();
  }, []);
  return (
    <div className="balance-container">
      <div>
        <div className="balance-info">
          <span className="balance-label">Available fund:</span>
          <span className="balance-amount">{fundObj.available_margin}</span>
        </div>
        <div className="balance-info">
          <span className="balance-label">Used Amount:</span>
          <span className="balance-amount">{fundObj.used_margin}</span>
        </div>
      </div>
      <button className="refresh-button" onClick={balanceInfo}>
        Refresh
      </button>
    </div>
  );
};
