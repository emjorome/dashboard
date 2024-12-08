import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import Item2 from '../interface/Item2';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item2[];
}

export default function LineChartWeather(props: MyProp) {
    const [xLabels, setXLabels] = useState<string[]>([]);
    const [yLabels, setYLabels] = useState<number[]>([]);

    useEffect(() => {
        if (props.itemsIn && props.itemsIn.length > 0) {
            const xData = props.itemsIn.map((item) => String(item.date));
            const yData = props.itemsIn.map((item) => parseFloat(String(item.temperature)));

            setXLabels(xData);
            setYLabels(yData);
        }
    }, [props.itemsIn])

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
                    { data: yLabels, label: 'Grado Celsius por hora' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}