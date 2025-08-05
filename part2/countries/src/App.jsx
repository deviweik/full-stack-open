import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const searchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  console.log('countries', countries)

  return (
    <>
      <h1>Countries</h1>
      <div>
        <h2>Search:</h2>
        <input 
          type="text" 
          value={search} 
          placeholder='Search for a country' 
          onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <h2>Results:</h2>
        {searchedCountries.length === 0 && <p>No countries found.</p>}
        {searchedCountries.length > 10 && <p>Too many matches, specify another filter.</p>}
        {searchedCountries.length <= 10 && searchedCountries.length > 1 && (
          <ul>
            {searchedCountries.map(country => (
              <li key={country.cca3}>
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
        {searchedCountries.length === 1 && (
          <div>
            <h3>{searchedCountries[0].name.common}</h3>
            <p>Capital: {searchedCountries[0].capital[0]}</p>
            <p>Population: {searchedCountries[0].population} people</p>
            <p>Area: {searchedCountries[0].area} sq km</p>
            <h4>Languages:</h4>
            <ul>
              {Object.values(searchedCountries[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <h4>Flag:</h4>
            <img src={searchedCountries[0].flags.png} alt={`Flag of ${searchedCountries[0].name.common}`} />
          </div>
        )}
      </div>
      {/* {<button onClick={() => console.log(searchedCountries[0])}>Log Country</button>} */}
    </>
  )
}

export default App
