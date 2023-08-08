import { useState, useEffect } from 'react';
import axios from 'axios';

function Temp(){
    const [temp, setTemp] = useState(0);
    const [hum, setHum] = useState(0);
    
    async function refreshTemp() {
        let res = await axios.get('http://localhost:8080/api/DHT22');
        setTemp(res.data.temperature);
        setHum(res.data.humidity);
    }
    useEffect(() => {
      const timerId = setInterval(refreshTemp, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
      <div className='General ParamsDHT'>
        <span className='Text'>
          Temperature: {temp.toFixed(1)}°C
        </span>
        <span className='Text'>
          Humidity: {hum.toFixed(1)}%
        </span>
      </div>
    );
  }

export default Temp;