import { useState, useEffect } from 'react'
import axios from 'axios'
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
