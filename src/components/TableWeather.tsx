import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface HourlyWeather {
  time: string; // Hora (e.g., "14:00")
  temperature: string; // Temperatura (e.g., "28.5°C")
  condition: string; // Condición climática (e.g., "Clear")
  humidity: string; // Humedad (e.g., "65%")
}

interface TableWeatherProps {
  hourlyData: HourlyWeather[]; // Datos por horas
}

/*function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function BasicTable({ hourlyData }: TableWeatherProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="hourly weather table">
        <TableHead>
          <TableRow>
            <TableCell>Hora</TableCell>
            <TableCell align="right">Temperatura</TableCell>
            <TableCell align="right">Clima</TableCell>
            <TableCell align="right">Humedad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourlyData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.condition}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}