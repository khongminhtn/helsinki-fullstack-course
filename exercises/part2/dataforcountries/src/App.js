import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search = (props) => {
  // Search bar
  return(
    <div>
      <form>
          <div>find countries<input onChange={props.searchCountry}/></div>
      </form>
    </div>
  )
}

const CountryDetail = ({country}) => {
  const [showCountry, setShowCountry] = useState(false)
  const toggleShowCountry = () => setShowCountry(!showCountry)
  return (
    <div>
      <>{country.name}</>
      <button onClick={toggleShowCountry}>show</button>
      {
        showCountry
        ? <>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h3>languages</h3>
            <ul>
              {
                country.languages.map(language => <li key={language.name}>{language.name}</li>)
              }
            </ul>
            <img src={country.flag} width='150' height='100' alt='flag'/>
          </>
        : null
      }
    </div>
  )
}

const DisplayCountries = (props) => {
  // Filtered Countries
  const countriesToDisplay = props.countriesToDisplay

  // Weather request params
  const [weather, setWeather] = useState()
  useEffect(() => {
    const endPoint = 'https://api.weatherstack.com/current'
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: countriesToDisplay.length === 1 ? countriesToDisplay[0].name : null
    }
    if (countriesToDisplay.length === 1) {
      console.log('Fetching Weather...') ////
      axios
        .get(endPoint, {params})
        .then(response => setWeather(response.data.current))
    }
  }, [countriesToDisplay])


  return(
    <div>
      {
        countriesToDisplay.length > 10
        ? <>Too many matches, specify another filter</>
        : countriesToDisplay.length === 1 && weather
        ? <>
            <h1>{countriesToDisplay[0].name}</h1>
            <div>Capital: {countriesToDisplay[0].capital}</div>
            <div>Population: {countriesToDisplay[0].population}</div>
            <h3>languages</h3>
            <ul>
              {
                countriesToDisplay[0].languages.map(language => <li key={language.name}>{language.name}</li>)
              }
            </ul>
            <img src={countriesToDisplay[0].flag} width='150' height='100'alt='flag'/>
            <h3>Weather in {countriesToDisplay[0].name}</h3>
            <h6>temperature: {weather.temperature}</h6>
            <img src={weather.weather_icons} width='100' height='100' alt='weather'/>
            <h6>wind: {weather.wind_speed} mph direction {weather.wind_dir}</h6>
          </>
        : countriesToDisplay.map(country => <CountryDetail key={country.name} country={country}/>)
      }
    </div>
  )
}

const App = () => {

  // Fetches countries data
  const [countries, setCountries] = useState([])
  useEffect(() => {
    console.log('Fetching Countries..') ////
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // response.data list of objects, contain countries info
        setCountries(response.data)
      })
  },[])

  // Find and filter countries
  const [searchInput, setSearchInput] = useState('')
  const searchCountry = (e) => setSearchInput(e.target.value)
  const countriesToDisplay = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))
  return (
    <div className="App">
      <Search 
        searchCountry={searchCountry}/>
      {
        searchInput.length === 0
        ? <div/>
        : <DisplayCountries countriesToDisplay={countriesToDisplay}/>
      }
    </div>
  )
}

export default App
