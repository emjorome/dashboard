import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import Item2 from '../interface/Item2';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item2[];
    selectedVariable: string;
}

export default function LineChartWeather(props: MyProp) {
    const [xLabels, setXLabels] = useState<string[]>([]);
    const [yLabels, setYLabels] = useState<number[]>([]);
    const [name, setName] = useState<string>();

    useEffect(() => {
        if (props.itemsIn && props.itemsIn.length > 0) {
            const xData = props.itemsIn.map((item) => String(item.date));
            setXLabels(xData);

            if (parseInt(props.selectedVariable) == 0){
                const yData = props.itemsIn.map((item) => parseFloat(String(item.precipitation)));
                setName("Precipitación");
                setYLabels(yData);
            } else if (parseInt(props.selectedVariable) == 1){
                const yData = props.itemsIn.map((item) => parseFloat(String(item.humidity)));
                setName("Humedad");
                setYLabels(yData);
            } else if (parseInt(props.selectedVariable) == 2){
                const yData = props.itemsIn.map((item) => parseFloat(String(item.clouds_value)));
                setName("Nubosidad");
                setYLabels(yData);
            } else {
                const yData = props.itemsIn.map((item) => parseFloat(String(item.precipitation)));
                setName("Precipitación");
                setYLabels(yData);
            }     
        }
    }, [props.itemsIn, props.selectedVariable])

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={800}
                height={500}
                series={[
                    { data: yLabels, label: `Gráfico de ${name}` },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}