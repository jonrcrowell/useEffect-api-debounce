import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDebounce } from 'use-debounce';


const url = 'https://restcountries.eu/rest/v2/all';

function App() {
  const [countries, updateCountries] = useState(null);
  const [search, updateSearch] = useState('');

  // hjälper att vänta med laddningen 1s under sökningen
  // då udviker onjödiga laddning efter varje ex: bukstav
  const [debounced] = useDebounce(search, 1000);


  // Filtrera listan,genom att göra ett anrop till API:et
  useEffect(() => {
    if (search.length > 0) {
      axios.get('https://restcountries.eu/rest/v2/name/' + search).then(response => {
        updateCountries(response.data)
      });

    } else {
      // ett useEffect anrop 
      axios.get(url).then(response => {
        console.log(response.data);

        updateCountries(response.data);
      })
    }
  }, [debounced]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
        <label>Search </label>
        <input
          value={search}
          onChange={e => updateSearch(e.target.value)}
          style={{ marginBottom: '7px', fontSize: '20px', minWidth: '480px' }}
        />

        {!countries ? <p>Loading countries ...</p> : <table border='2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Region</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.numericCode}>
                <td>{country.name}</td>
                <td>{country.capital}</td>
                <td>{country.region}</td>
                <td>{new Intl.NumberFormat().format(country.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>}

      </header>
    </div >
  );
}

export default App;
