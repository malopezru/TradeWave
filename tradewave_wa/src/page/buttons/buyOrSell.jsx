import React, { useState } from 'react';

function BuyOrSell() {
  const [isPurchased, setIsPurchased] = useState(false);

  const buyStock = () => {
    // ... code to buy stock
    setIsPurchased(true);
  };

  const sellStock = () => {
    // ... code to sell stock
    setIsPurchased(false);
  };

  return (
    <div>
      {isPurchased ? (
        <button onClick={sellStock} className="buy-button">Sell</button>
      ) : (
        <button onClick={buyStock} className="buy-button">Buy</button>
      )}
    </div>
  );
}
  
export default BuyOrSell;