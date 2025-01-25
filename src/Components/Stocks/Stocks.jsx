import { useState, useEffect } from "react";
import "./Stocks.css";
import { handleApiToGetPortfolio } from "../../apiHandler";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showPlaceOrderModal, stockData } from "../../store/atoms/stockData";
import { userData } from "../../store/atoms/userData";

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
      setTableData([
        {
            "companyName": "ADANI GREEN ENERGY LTD",
            "tradingSymbol": "ADANIGREEN",
            "profit": 1245.3,
            "quantity": 4,
            "averagePrice": 700.77,
            "closingPrice": 1012.1,
            "instrumentToken": "NSE_EQ|INE364U01010",
            "oneYearMax": 2070.55,
            "percentFromMax": -52
        },
        {
            "companyName": "JIO FIN SERVICES LTD",
            "tradingSymbol": "JIOFIN",
            "profit": 1344.14,
            "quantity": 9,
            "averagePrice": 95.1,
            "closingPrice": 244.45,
            "instrumentToken": "NSE_EQ|INE758E01017",
            "oneYearMax": 387.95,
            "percentFromMax": -37
        },
        {
            "companyName": "ADANI PORT & SEZ LTD",
            "tradingSymbol": "ADANIPORTS",
            "profit": 5681.8,
            "quantity": 10,
            "averagePrice": 525.97,
            "closingPrice": 1094.15,
            "instrumentToken": "NSE_EQ|INE742F01042",
            "oneYearMax": 1590.15,
            "percentFromMax": -32
        },
        {
            "companyName": "MONTE CARLO FASHIONS LTD.",
            "tradingSymbol": "MONTECARLO",
            "profit": 2148.5,
            "quantity": 14,
            "averagePrice": 518.94,
            "closingPrice": 672.4,
            "instrumentToken": "NSE_EQ|INE950M01013",
            "oneYearMax": 952.2,
            "percentFromMax": -30
        },
        {
            "companyName": "APOLLO TYRES LTD",
            "tradingSymbol": "APOLLOTYRE",
            "profit": 4531.55,
            "quantity": 20,
            "averagePrice": 196.82,
            "closingPrice": 423.4,
            "instrumentToken": "NSE_EQ|INE438A01022",
            "oneYearMax": 564.25,
            "percentFromMax": -25
        }
      ])
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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="fixed-column">Company Name</th>
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
                      className="place-order-button"
                      onClick={() => placeOrder(row)}
                    >
                      Place Order
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
