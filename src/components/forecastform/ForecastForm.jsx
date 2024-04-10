import React, { useState, useEffect } from 'react'
import './ForecastForm.css'
import white_arrow from  '../../assets/white-arrow.png'
import axios from 'axios';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const ForecastForm = () => {
    const [dateTime, setDateTime] = useState('');
    const [city, setCity] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (predictions) {
            const labels = Object.keys(predictions);
            const data = Object.values(predictions);
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Hourly Solar Power Output (kW)',
                        data,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        }
    }, [predictions]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictions(null);

        try {
            const response = await axios.post('http://localhost:5173/getSolarForecast', { dateTime, city });
            setPredictions(response.data.predictions);
        } catch (err) {
            setError('Failed to fetch the forecast. Please try again.');
        }
    };


  return (
    <div className='forecast-col'>
        <form onSubmit={handleSubmit}>
            <div className='info'>
                <label htmlFor="dateTime">Date and Time (YYYY-MM-DD HH:MM): </label>
                <input type="text" id="dateTime" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </div>
            <div className='info'>
                <label htmlFor="city">City: </label>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
                <button type="submit" className='btn dark-btn'>Solar Forecast<img src={white_arrow} alt=""/></button>
        </form>
        {error && <p>{error}</p>}

        {predictions && (
            <div className='predicts'>
                <h2>Hourly Solar Power Output Predictions:</h2>
                <ul>
                    {Object.entries(predictions).map(([timestamp, prediction]) => (
                        <li key={timestamp}>{`${timestamp}: ${prediction}`}</li>
                    ))}
                </ul>
                <div className='pattern'>
                    <h3>Forecast Pattern</h3>
                    <Line data={chartData} />
                </div>
            </div>
        )}
    </div>
  )
}

export default ForecastForm