import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const url = 'https://restcountries.eu/rest/v2/all';

function App() {
  const [countries, updateCountries] = useState(null);

  useEffect(() => {
    axios.get(url).then(response => {
      console.log(response.data);

      updateCountries(response.data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
        {!countries ? <p>Loading countries ...</p> : <table border='2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>

            {countries.map(country => (
              <tr key={country.numericCode}>
                <td>{country.name}</td>
                <td>{country.capital}</td>
                <td>{country.region}</td>
              </tr>
            ))}
          </tbody>
        </table>}

      </header>
    </div >
  );
}

export default App;
