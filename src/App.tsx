//import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import Grid from '@mui/material/Grid2' 
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';

function App() {
  //const [count, setCount] = useState(0)

   // Estado para almacenar los datos del clima
   const [weatherData, setWeatherData] = useState({
      temperature: '',
      humidity: '',
      pressure: '',
      windSpeed: '',
   });

   // Función para obtener datos desde la API
   const fetchWeatherData = async () => {
      try {
      const response = await fetch(
         'https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=ad655bd73162581d52d762d5e28c8076'
      );
      const textResponse = await response.text();

      // Parsear XML (usando DOMParser)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textResponse, 'text/xml');

      // Extraer datos específicos del XML
      const temperature = xmlDoc.querySelector('temperature')?.getAttribute('value') || '';
      const humidity = xmlDoc.querySelector('humidity')?.getAttribute('value') || '';
      const pressure = xmlDoc.querySelector('pressure')?.getAttribute('value') || '';
      const windSpeed = xmlDoc.querySelector('windSpeed')?.getAttribute('value') || '';

      // Actualizar el estado
      setWeatherData({
         temperature: `${(parseFloat(temperature) - 273.15).toFixed(2)}°C`, // Convertir de Kelvin a Celsius
         humidity: `${humidity}%`,
         pressure: `${pressure} hPa`,
         windSpeed: `${(parseFloat(windSpeed) * 3.6).toFixed(2)} km/h`, // Convertir de m/s a km/h
      });
      } catch (error) {
      console.error('Error al obtener datos del clima:', error);
      }
   };

   // Ejecutar fetchWeatherData al montar el componente
   useEffect(() => {
      fetchWeatherData();
   }, []);

  return (
    <Grid container spacing={5}>

       	  {/* Indicadores */}
           <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Temperatura'} subtitle={'Actual'} value={weatherData.temperature} /> 
           </Grid>
           <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Humedad'} subtitle={'Relativa'} value={weatherData.humidity} />
           </Grid>
           <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Presión'} subtitle={'Atmosférica'} value={weatherData.pressure} />
           </Grid>
           <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Viento'} subtitle={'Velocidad'} value={weatherData.windSpeed} />
            </Grid>
		      
           {/* Tabla */}
           <Grid size={{ xs: 12, xl: 8 }}>
               {/* Grid Anidado */}
               <Grid container spacing={2}>
                  <Grid size={{ xs: 12, xl: 3 }}>
                        <ControlWeather/>
                  </Grid>
                  <Grid size={{ xs: 12, xl: 9 }}>
                        <TableWeather/>
                  </Grid>
               </Grid>

           </Grid>
		      
           {/* Gráfico */}
           <Grid size={{ xs: 12, xl: 4 }}>
               <LineChartWeather/>
            </Grid>
		  
    </Grid>
  )
}

export default App