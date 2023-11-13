import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import Header from "../page/header/index.jsx";
import { useNavigate } from "react-router-dom";

function Stock({ data, actual_price, predicted_price, message }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("data", data);
    navigate('/Details');
  };



  return (
    <Link to={`/Details`} onClick={handleClick} className="stock-link">
      <div className="stock">
        <h2>{data}</h2>
        <p>Actual Price: <span className="value">{parseFloat(actual_price).toFixed(3)}$</span></p>
        <p>Predicted Price: <span className="value">{parseFloat(predicted_price).toFixed(3)}$</span></p>
        <p>Message: <span className="value">{message}</span> </p>
        
      </div>
    </Link>
  );
}

function Stocks({ stocks }) {
  return (
    <section className="stocks">
      {stocks.map((node) => (
        <div className="stock-box">  {/* Add a CSS class here */}
          <Stock
            data={node.data}
            actual_price={node.actual_price}
            predicted_price={node.predicted_price}
            message={node.message}
          />
        </div>
      ))}
    </section>
  );
}

function StockPurchases() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7651/stock_prediction_list/"
        );
        const data = response.data;
        
        
        const purchased_ = await axios.get("http://localhost:80/transactions/user",
            {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            }
        );

        let purchased=purchased_.data;
        //filtrar los stocks que no son del usuario

        let stocks = purchased.map(item => item.stock);
        let filteredData = data.filter(item => stocks.includes(item.data));
        setStocks(filteredData);
            

        
      } catch (error) {
        //modal

        console.error(error);
        // Error handling
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
    <Header />
    {/* Check if stocks is not undefined before calling map */}
    {stocks && <Stocks stocks={stocks} />}
  </div>
  );
}

export default StockPurchases;