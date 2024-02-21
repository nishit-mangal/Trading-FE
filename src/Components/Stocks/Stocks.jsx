import { useState, useEffect } from "react";
import "./Stocks.css";
import { handleApiToGetPortfolio } from "../../apiHandler";

export const Stocks = ({setShowPlaceOrderModal, setStockData}) => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    portfolio();
  }, []);
  
  const portfolio = async () => {
    let response = await handleApiToGetPortfolio();
    if (!response) {
      alert("Unable to fetch portfolio. Please try again later");
      return;
    }
    setTableData(response);
  };

  const placeOrder = (row)=>{
    console.log('place order called', row)
    setShowPlaceOrderModal(true)
    setStockData(row)
    // return <PlaceOrder />
  }

  return (
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
                  <button className="place-order-button" onClick={()=>placeOrder(row)}>Place Order</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
