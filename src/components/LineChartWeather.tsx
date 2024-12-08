import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import Item2 from '../interface/Item2';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item2[];
}

export default function LineChartWeather(props: MyProp) {

    let [rows, setRows] = useState<Item2[]>([])
    const [xLabels, setXLabels] = useState<string[]>([]);
    const [yLabels, setYLabels] = useState<number[]>([]);

    useEffect(() => {
        setRows(props.itemsIn)
        const xData = rows.map((row) => String(row.date));
        const yData = rows.map((row) => parseFloat(String(row.temperature)));

        setXLabels(xData);
        setYLabels(yData);
    }, [props])

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