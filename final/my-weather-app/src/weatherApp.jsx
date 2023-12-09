import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { setLocation, setTemperature, setLoading, setError } from './weatherSlice';

const apiKey = 'd43df9be6e1e41df93e205932230712';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { location, temperature, loading, error } = useSelector((state) => state.weather);

  const fetchWeather = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(`${apiUrl}?key=${apiKey}&q=${location}`);
      const data = response.data;

      dispatch(setTemperature(data.current.temp_c));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('ارور در نحوه دریافت'));
    } finally {
      dispatch(setLoading(false));
    }
  };

 

  const boxes = () => {
    if (temperature === '') {
      return null;
    }
  
    let sunnyTemp, cloudyTemp, rainyTemp;
    if (temperature >= 20) {
      sunnyTemp = temperature;
    } else if (temperature >= 10) {
      cloudyTemp = temperature;
    } else {
      rainyTemp = temperature;
    }
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Paper
          style={{ padding: '30px', textAlign: 'center', width: '30%', backgroundColor: '#ff9800' }}
        >
          <Typography variant="subtitle1" style={{ fontSize: '1.5rem' }}>sunny</Typography>
          <Typography variant="h3">{sunnyTemp !== undefined ? '🔥' : ''}</Typography>
          <Typography variant="body1">{sunnyTemp !== undefined && sunnyTemp + '°'}</Typography>
        </Paper>
        <Paper
          
          style={
            { padding: '30px', textAlign: 'center', width: '30%', backgroundColor: '#ffc107' }
          }
        >
          <Typography variant="subtitle1" style={{ fontSize: '1.5rem' }}>cloudy</Typography> <Typography variant="h3">{cloudyTemp !== undefined ? '☀️' : ''}</Typography><Typography variant="body1">{cloudyTemp !== undefined && cloudyTemp + '°'}</Typography>
        </Paper>
        <Paper
          style={
            { padding: '30px', textAlign: 'center', width: '30%', backgroundColor: '#ffeb3b' }
          }
        >
           <Typography variant="subtitle1" style={{ fontSize: '1.5rem' }}>rainy</Typography><Typography variant="h3">{rainyTemp !== undefined ? '🌤️' : ''}</Typography><Typography variant="body1">{rainyTemp !== undefined && rainyTemp + '°'}</Typography>
        </Paper>
      </div>
    );
  };
  


  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Weather App</Typography>
      <TextField
        label="Enter location"
        variant="filled"
        fullWidth
        value={location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
        style={
          { margin: '10px 0' }
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchWeather}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </Button>
      {error && <Typography variant="body1" style={
        { color: 'red', margin: '10px 0' }
        }>{error}</Typography>}
      {temperature !== null && (
        <>
          <Typography variant="h5" style={{ marginTop: '10px' }}>
            Temperature: {temperature}°C
          </Typography>
          {boxes()}
        </>
      )}
    </Container>
  );
};

export default WeatherApp;
