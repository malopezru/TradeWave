import React, { useState } from 'react';
//import modal componet
import CustomModal from '../../components/Modal';
import axios from 'axios';
import { useEffect } from 'react';


function BuyOrSell() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const purchasedStock =async () => {
    let response = await axios.get("http://localhost:80/transactions/user",
    {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    }
  );

  let stock=response.data;
  for(let i=0;i<stock.length;i++){
    if(stock[i].stock===localStorage.getItem('data')){
      setIsPurchased(true);
    }
    else{
      setIsPurchased(false);
    }
  }

    
  }
  

  const buyStock = async () => {
    const response = await axios.post(
      `http://localhost:80/transactions/stock/${localStorage.getItem('data')}?action=buy`,
      {},
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      }
    );
    if(response.status === 200){
      setIsPurchased(true);
      setModalMessage('Stock comprado');
      setModalIsOpen(true);
    }
  };

  const sellStock = async() => {
    const response = await axios.post(
      `http://localhost:80/transactions/stock/${localStorage.getItem('data')}?action=sell`,
      {},{
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      }
    );
    if(response.status === 200){
      setIsPurchased(false);
      setModalMessage('Stock vendido');
      setModalIsOpen(true);
    }
    
  };
  useEffect(() => {
    purchasedStock();
  }, []);
  return (
    <div>
      {isPurchased ? (
        <button onClick={sellStock} className="buy-button">Sell</button>
      ) : (
        <button onClick={buyStock} className="buy-button">Buy</button>
      )}
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
  
export default BuyOrSell;