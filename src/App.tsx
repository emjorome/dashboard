//import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
{/* Hooks */ }
import { useEffect, useState } from 'react';
import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item';
import Item2 from './interface/Item2';

interface Indicator {
   title?: String;
   subtitle?: String;
   value?: String;
}

function App() {
   //const [count, setCount] = useState(0)

   {/* Variable de estado y función de actualización */ }
   let [indicators, setIndicators] = useState<Indicator[]>([])
   let [items, setItems] = useState<Item[]>([])
   let [items2, setItems2] = useState<Item2[]>([])

   {/* Hook: useEffect */ }
   useEffect(() => {
      let request = async () => {
         {/* Request */ }
         let API_KEY = "ad655bd73162581d52d762d5e28c8076"
         let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
         let savedTextXML = await response.text();

         {/* XML Parser */ }
         const parser = new DOMParser();
         const xml = parser.parseFromString(savedTextXML, "application/xml");

         {/* Arreglo para agregar los resultados */ }

         let dataToIndicators: Indicator[] = new Array<Indicator>();

         {/* 
              Análisis, extracción y almacenamiento del contenido del XML 
              en el arreglo de resultados
          */}

         let name = xml.getElementsByTagName("name")[0].innerHTML || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

         let location = xml.getElementsByTagName("location")[1]

         let latitude = location.getAttribute("latitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

         let longitude = location.getAttribute("longitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

         let altitude = location.getAttribute("altitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

         //console.log(dataToIndicators)

         {/* Modificación de la variable de estado mediante la función de actualización */ }
         setIndicators(dataToIndicators)

         {/* Arreglo para agregar los resultados */ }
         let dataToTable: Item[] = new Array<Item>();
         let dataToGraphip: Item2[] = new Array<Item2>();

         {/* 
              Análisis, extracción y almacenamiento del contenido del XML 
              en el arreglo de resultados
          */}
         let timeNodes = xml.querySelectorAll('time')
         Array.from(timeNodes).map((node) => {
            let dateStart = node.getAttribute('from')?.split('T')[1]?.slice(0, 5) || ""
            let dateEnd = node.getAttribute('to')?.split('T')[1]?.slice(0, 5) || ""
            let precipitationNode = node.querySelector('precipitation')
            let precipitation = precipitationNode?.getAttribute('probability') || ""
            let humidity = node.querySelector('humidity')?.getAttribute('value') || ''
            let clouds = node.querySelector('clouds')?.getAttribute('value') || ''

            let date = dateStart + " - " + dateEnd
            let temperature = node.querySelector('temperature')?.getAttribute('value') || ''

            temperature = (parseFloat(temperature) - 273.15).toFixed(2)



            dataToTable.push({ dateStart, dateEnd, precipitation, humidity, clouds })
            dataToGraphip.push({ date, temperature})
         })

         setItems(dataToTable.slice(0, 10))
         setItems2(dataToGraphip.slice(0,8))
      }

      request();
   }, [])

   return (
      <>
         {/* Barra de navegación */}
         <div className="navbar">
            <div className="navbar-logo">SkyGYE</div>
            <div className="navbar-links">
               <a href="#indicadores">Detalles</a>
               <a href="#tabla">Tabla</a>
               <a href="#grafico">Gráfico</a>
            </div>
         </div>

         {/* Introducción */}
         <section className="intro">
            <div className="intro-content">
               <h1>Bienvenido SkyGYE</h1>
               <p>
                  Obtén pronósticos y datos climáticos actualizados para la ciudad de Guayaquil.
                  Explora y descubre datos interactivos para conocer el clima en tiempo real.
               </p>
               <img src='https://imagenes.expreso.ec/files/image_440_279/uploads/2023/05/19/6467d98da9b83.jpeg' alt="imagen" id="imagen"></img>
            </div>
         </section>

         <Grid container spacing={5}>

            {/* Indicadores */}
            <section className="section" id="indicadores">
               <div className="section-content">
                  <h2 className="section-title">Detalles Climáticos</h2>
                  <p className="section-description">
                     Es importante saber sobre las condiciones meteorologicas que habrá hoy, puesto que, nuestros planes
                     pueden verse afectados, por lo tanto, invitamos a todos que observar estos detalles climáticos.
                  </p>

                  <Grid container spacing={5} justifyContent="center">

                     {
                        indicators
                           .map(
                              (indicator, idx) => (
                                 <Grid key={idx} size={{ xs: 12, sm: 3 }} className="indicator-container">
                                    <IndicatorWeather
                                       title={indicator["title"]}
                                       subtitle={indicator["subtitle"]}
                                       value={indicator["value"]} />
                                 </Grid>
                              )
                           )
                     }
                  </Grid>
               </div>
            </section>

            <section className="section" id="tabla">
               <div className="section-content">
                  <h2 className="section-title">Tabla Climática</h2>
                  <p className="section-description">
                     A continuación se presenta la tabla climática del tiempo actual de Guayaquil, donde nos indica información
                     escencial sobre la precipitación, la humedad o nubosidad que tendá la ciudad en esta y próximas horas.
                     A su izquierda puede ver las definiciones de los términos antes mencionados.
                  </p>

                  {/* Tabla */}
                  <Grid size={{ xs: 12, sm: 12 }}>
                     {/* Grid Anidado */}
                     <Grid container spacing={5} justifyContent="center">
                        <Grid size={{ xs: 12, sm: 3 }} className="control-container">
                           <ControlWeather />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 9 }} className="table-container">
                           <TableWeather itemsIn={items} />
                        </Grid>
                     </Grid>

                  </Grid>

               </div>
            </section>

            <section className="section" id="grafico">
               <div className="section-content">
                  <h2 className="section-title">Gráfica Climática</h2>
                  <p className="section-description">
                     Podemos observar el cambio de la temperatura a lo largo del día y próximas horas.
                  </p>

                  {/* Gráfico */}
                  <Grid size={{ xs: 12, sm: 12 }} className="chart-container" container spacing={5} justifyContent="center">
                     <LineChartWeather itemsIn={items2}/>
                  </Grid>

               </div>
            </section>

         </Grid >
      </>
   )
}

export default App