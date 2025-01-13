import { useEffect, useState } from "react";
import { handleApiToGetAccountBalance } from "../../apiHandler";
import "./BalanceComponent.css";
import { userData } from "../../store/atoms/userData";
import { useRecoilValue } from "recoil";

export const BalanceComponent = () => {
  const data = useRecoilValue(userData);    
  const [fundObj, setFundObj] = useState({
    availableFunds: undefined,
    usedFunds: undefined,
  });
  const balanceInfo = async () => {
    let response = await handleApiToGetAccountBalance();
    if (!response) {
      return;
    }
    let newObj = {
      availableFunds: response.available_margin,
      usedFunds: response.used_margin
    }
    setFundObj(newObj);
  };
  useEffect(() => {
    if(!data.secretsExists)
      return;    
    balanceInfo();
  }, [data.secretsExists]);
  return (
    <div className="balance-container">
      <div>
        <div className="balance-info">
          <span className="balance-label">Available fund:</span>
          <span className="balance-amount">{fundObj.availableFunds}</span>
        </div>
        <div className="balance-info">
          <span className="balance-label">Used Amount:</span>
          <span className="balance-amount">{fundObj.usedFunds}</span>
        </div>
      </div>
      <button className="transition-transform duration-150 ease-in-out transform active:scale-90" onClick={balanceInfo}>
        <img src="src\assets\refresh.png" alt="Refresh Funds" height={20} width={20} className="transition-transform duration-150 ease-in-out transform hover:scale-110"></img>
      </button>
    </div>
  );
};
