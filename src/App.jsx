import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://110.239.71.252:5005/api/gempa-terkini');
        setEarthquakes(response.data.Infogempa.gempa);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the earthquake data', error);
        setError('Error fetching the earthquake data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Informasi Gempa Bumi Terbaru</h1>
      <table className="earthquake-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Wilayah</th>
            <th>Magnitude</th>
            <th>Kedalaman</th>
          </tr>
        </thead>
        <tbody>
          {earthquakes.map((gempa, index) => (
            <tr key={index}>
              <td>{gempa.Tanggal}</td>
              <td>{gempa.Jam}</td>
              <td>{gempa.Wilayah}</td>
              <td>{gempa.Magnitude}</td>
              <td>{gempa.Kedalaman}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
