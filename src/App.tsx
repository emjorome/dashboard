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

interface HourlyWeather { //para tabla
   time: string;
   temperature: string;
   condition: string;
   humidity: string;
   precipitation: number; //grafico
 }

function App() {
  //const [count, setCount] = useState(0)

   // Estado para almacenar los datos del clima
   const [weatherData, setWeatherData] = useState({ //para indicadores
      temperature: '',
      humidity: '',
      pressure: '',
      windSpeed: '',
   });
   const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
   //Calcular el total de precipitacion
   const totalPrecipitation = hourlyWeather.reduce(
      (acc, data) => acc + data.precipitation,
      0
    );

    // Calcular el promedio de las temperaturas de las próximas horas
   const averageTemperature = hourlyWeather.reduce((acc, data) => {
      const temp = parseFloat(data.temperature); // Asegúrate de que la temperatura esté en número
      return acc + temp;
   }, 0) / hourlyWeather.length;
   
   // Asegúrate de que la temperatura esté en un valor razonable antes de mostrarla
   const averageTemperatureFormatted = isNaN(averageTemperature) ? 0 : averageTemperature.toFixed(2);

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

      // Extraer datos específicos del XML para el Indicator weather
      const temperature = xmlDoc.querySelector('temperature')?.getAttribute('value') || '';
      const humidity = xmlDoc.querySelector('humidity')?.getAttribute('value') || '';
      const pressure = xmlDoc.querySelector('pressure')?.getAttribute('value') || '';
      const windSpeed = xmlDoc.querySelector('windSpeed')?.getAttribute('mps') || '';

      // Actualizar el estado 
      setWeatherData({
         temperature: `${(parseFloat(temperature) - 273.15).toFixed(2)}°C`, // Convertir de Kelvin a Celsius
         humidity: `${humidity}%`,
         pressure: `${pressure} hPa`,
         windSpeed: `${(parseFloat(windSpeed) * 3.6).toFixed(2)} km/h`, // Convertir de m/s a km/h
      });

      // Extraer datos específicos del XML para el Table weather
      const timeNodes = xmlDoc.querySelectorAll('time');
      const hourlyData = Array.from(timeNodes).map((node) => {
        const time = node.getAttribute('from')?.split('T')[1]?.slice(0, 5) || ''; // Extraer hora
        const temperature = node.querySelector('temperature')?.getAttribute('value') || '';
        const condition = node.querySelector('symbol')?.getAttribute('name') || '';
        const humidity = node.querySelector('humidity')?.getAttribute('value') || '';
        //Para el grafico LineCharWeather
        const precipitationNode = node.querySelector('precipitation');
        const precipitation = precipitationNode
        ? parseFloat(precipitationNode.getAttribute('value') || '0')
        : 0; //

        return {
          time,
          temperature: `${(parseFloat(temperature) - 273.15).toFixed(2)}°C`, // Convertir Kelvin a Celsius
          condition,
          humidity: `${humidity}%`,
          precipitation, //Grafico
        };
      });
      
      // Actualizar el estado 
      setHourlyWeather(hourlyData.slice(0, 10)); // Mostrar solo las primeras 10 horas

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

            <Grid size={{ xs: 12, xl: 3 }}>
              Guayaquil 
            </Grid>

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
                        <TableWeather hourlyData={hourlyWeather}/>
                  </Grid>
               </Grid>

           </Grid>
		      
           {/* Gráfico */}
           <Grid size={{ xs: 12, xl: 4 }}>
               <LineChartWeather precipitationData={hourlyWeather.map((data) => ({
                  time: data.time,
                  precipitation: data.precipitation,
               }))}/>
            </Grid>

            <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Temperatura promedio'} subtitle={'°C (Próximas horas)'} value={`${averageTemperatureFormatted} °C`} /> 
            </Grid>

            <Grid size={{ xs: 12, xl: 3 }}>
              <IndicatorWeather title={'Total de Lluvia'} subtitle={'mm (Próximas horas)'} value={`${totalPrecipitation.toFixed(2)} mm`} /> 
            </Grid>
		  
    </Grid>
  )
}

export default App