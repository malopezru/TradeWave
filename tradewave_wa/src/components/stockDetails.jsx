import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Header from '../page/header/index.jsx';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts';
//buy or sell button 
import BuyOrSell from '../page/buttons/buyOrSell.jsx';

function StockDetails() {
  const [comic, setComic] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchComic = async () => {
      const data = localStorage.getItem('data');
      if (!data) {
        console.error('ID no encontrado en el almacenamiento local');
        return;
      }

      try {
        let response = await axios.get(
          `http://localhost:7651/stock_info/?name=${data}`
        );
        response = response.data[0];
        setComic(response);
        localStorage.setItem("stock", response);

        const today = new Date();
        const historicData = response['historic data'].map((item, index) => {
          const date = new Date();
          date.setDate(today.getDate() - index);
          const dateString = date.toLocaleDateString();

          return {
            name: dateString,
            historic: item,
          };
        }).reverse();

        const predictedData = response['predicted prices'].map((item, index) => {
          const date = new Date();
          date.setDate(today.getDate() + index + 1);
          const dateString = date.toLocaleDateString();

          return {
            name: dateString,
            predicted: item,
          };
        });

        setChartData([...historicData, ...predictedData]);
        
      } catch (error) {
        if (error.response.status === 404) {
          setModalMessage('accion no encontrado');
          setModalIsOpen(true);
          //esperar 5 segundos
          setTimeout(() => {
            //redireccionar a login
            navigate('/AppMain');
          }, 5000);
          console.log(error);
        } else {
          setModalMessage('Error del servidor');
          setModalIsOpen(true);
        }
      }
    }

    fetchComic();
  }, [navigate]);
  if (!comic) {
    return <div>Cargando...</div>;
  }
  const data = localStorage.getItem('data');
  return (
    <div className="chart-container">
  <Header title="Detalles del cómic" />
  
  <h2>{data}</h2>
  <LineChart width={500} height={300} data={chartData}>
  <Line type="monotone" dataKey="historic" stroke="#3f51b5" fillOpacity={1} fill="url(#colorHistoric)" dot={false} activeDot={false} />
  <Line type="monotone" dataKey="predicted" stroke="#f50057" fillOpacity={1} fill="url(#colorPredicted)" dot={false} activeDot={false} />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Brush />
  <defs>
    <linearGradient id="colorHistoric" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#3f51b5" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f50057" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#f50057" stopOpacity={0}/>
    </linearGradient>
  </defs>
</LineChart>
  <BuyOrSell />
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    className="custom-modal"
  >
    <div>{modalMessage}</div>
  </Modal>
</div>
  );
}

export default StockDetails;