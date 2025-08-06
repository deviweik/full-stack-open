import { useState, useEffect } from 'react'
import axios from 'axios'
import weatherCodes from './assets/weather_codes.json'
import './App.css'

const SearchInput = ({ search, setSearch }) => (
  <div style={{ marginBottom: '1em', display: 'flex', alignItems: 'center' }}>
    <h2>Search:</h2>
    <input
      style={{ marginLeft: '1em', padding: '0.5em', fontSize: '1em' }}
      type="text" 
      value={search} 
      placeholder='Search for a country' 
      onChange={(e) => setSearch(e.target.value)} />
  </div>
)

const SearchResults = ({ searchedCountries }) => {
  if (searchedCountries.length === 0) {
    return (
      <>
        <h2>Search Results:</h2>
        <p>No countries found.</p>
      </>
    )
  }
  if (searchedCountries.length > 10) {
    return (
      <>
        <h2>Search Results:</h2>
        <p>Too many matches, specify another filter.</p>
      </>
    )
  }
  if (searchedCountries.length === 1) {
    const country = searchedCountries[0];
    return (
      <div>
        <h2>Search Results:</h2>
        <CountryDetails country={country} />
      </div>
    )
  }
  return (
    <>
      <h2>Search Results:</h2>
      <ul>
        {searchedCountries.map(country => (
          <CountryResultItem 
            key={country.cca3} 
            country={country} 
            onShow={(country) => console.log('Show details for:', country.name.common)} 
          />
        ))}
      </ul>
    </>
  )
}

const CountryResultItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)
  const onShow = showDetails ? () => setShowDetails(false) : () => setShowDetails(true)

  return (
    <li>
      {country.name.common}
      <button
        style={{ marginLeft: '1em', padding: '0.3em', fontSize: '1em' }}
        onClick={onShow}
      >
        {showDetails ? 'Hide' : 'Show'}
      </button>
      {showDetails && <CountryDetails country={country} />}
    </li>
  )
}

const CountryDetails = ({ country }) => {
  const latlng = country.capitalInfo?.latlng
  const url = latlng
    ? `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,precipitation,wind_speed_10m,is_day,weather_code&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
    : null
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!url) {
      setWeather(null)
      return
    }
    axios
      .get(url)
      .then(res => {
        setWeather(res.data?.current)
        console.log('Weather data fetched:', res.data)
      })
      .catch(err => {
        console.error('Error fetching weather data:', err)
      })
  }, [url]) // Fetch weather data when the URL changes

  return (
    <div>
      <h3 style={{textDecoration: 'underline'}}>{country.name.common}</h3>
      <div style={{paddingLeft: '1em'}}>
        <p><b>Capital:</b> {country.hasOwnProperty('capital') ? country.capital[0] : 'No Capital'}</p>
        <p><b>Population:</b> {country.population} people</p>
        <p><b>Area:</b> {country.area} sq km</p>
        <p><b>Languages:</b> {Object.values(country.languages).join(', ')}</p>
        <p><b>Flag:</b></p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <WeatherDetails capital={country?.capital[0]} weather={weather} />
      </div>
    </div>
  )
}

const WeatherDetails = ({ capital, weather }) => {
  if (!weather) {
    return <p>Loading weather data...</p>
  }

  const codeInfo = weatherCodes[weather.weather_code] || {}
  const weatherCodeDesc = weather.is_day ? codeInfo.day : codeInfo.night || "Unknown"

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div style={{paddingLeft: '1em'}}>
        <p><b>Temperature:</b> {weather.temperature_2m}°F</p>
        <p><b>Day/Night:</b> {weather.is_day ? "Daytime" : "Nighttime"}</p>
        <p><b>Precipitation:</b> {weather.precipitation} inches</p>
        <p><b>Wind Speed:</b> {weather.wind_speed_10m} mph</p>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <p><b>Condition:</b> {weatherCodeDesc.description}</p>
          <img
            src={weatherCodeDesc.image}
            alt={weatherCodeDesc.description + ' icon'}
            style={{ width: '32px', height: '32px', marginLeft: '0.5em', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data)
        console.log('Countries fetched:', res.data.length)
        console.log('Countries:', res.data)
      })
  }, [])

  const searchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <h1>Countries</h1>
      <SearchInput search={search} setSearch={setSearch} />
      <SearchResults searchedCountries={searchedCountries} />
      {/* {<button onClick={() => console.log(searchedCountries[0])}>Log Country</button>} */}
    </>
  )
}

export default App
