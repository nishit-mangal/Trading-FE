import { useState, useEffect } from "react";
import "./Stocks.css";
import { handleApiToGetPortfolio } from "../../apiHandler";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showPlaceOrderModal, stockData } from "../../store/atoms/stockData";
import { userData } from "../../store/atoms/userData";
import { defaultHoldingData } from "../../constants";

export const Stocks = () => {
  const [tableData, setTableData] = useState([]);
  const data = useRecoilValue(userData);    
  const setStockData = useSetRecoilState(stockData);
  const setShowPlaceOrderModal = useSetRecoilState(showPlaceOrderModal)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if(!data.secretsExists)
      return;
    portfolio();
  }, [data.secretsExists]);

  const portfolio = async () => {
    if(data.userEmail==="sample4@gmailsdf.asd"){
      setTableData(defaultHoldingData)
      return;
    }
    setIsLoading(true);
    let response = await handleApiToGetPortfolio();
    setIsLoading(false);
    if (!response)
      return;
    
    setTableData(response);
  };

  const placeOrder = (row) => {
    setShowPlaceOrderModal(true)
    setStockData(row)
  };

  return (
    <>
      <div className="table-container mx-4">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Profit</th>
              <th>Quantity</th>
              <th>Average Price</th>
              <th>Closing Price</th>
              <th>1 Year Max</th>
              <th>% from Max</th>
              <th></th>
            </tr>
          </thead>
          <tbody>              
            {tableData.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.companyName}</td>
                  <td>{row.profit}</td>
                  <td>{row.quantity}</td>
                  <td>{row.averagePrice}</td>
                  <td>{row.closingPrice}</td>
                  <td>{row.oneYearMax}</td>
                  <td>{row.percentFromMax}</td>
                  <td>
                    <button
                      className="place-order-button hover:bg-teal-900 bg-teal-700"
                      onClick={() => placeOrder(row)}
                    >
                      Live Price
                    </button>
                  </td>
                </tr>
              );
            })}            
          </tbody>
        </table>
      </div>
      {tableData.length === 0 && 
        <div className="flex flex-col gap-4 items-center my-16">
          <div className="font-bold text-xl">Empty Data</div>
          <div className="font-medium text-base">Please <i className="mx-2">Generate Access Token</i> from the button given above</div>
          {!!isLoading && <div className="items-center my-2 font-light text-xs">Loading...</div> }
        </div>
      }
    </>
  );
};
