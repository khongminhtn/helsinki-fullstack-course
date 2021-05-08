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

const DisplayCountries = (props) => {
  // Displays filtered countries
  const countriesToDisplay = props.countries.filter(country => country.name.toLowerCase().includes(props.searchInput.toLowerCase()))
  return(
    <div>
      {
        props.searchInput.length === 0
        ? <div/>
        : countriesToDisplay.length > 10
        ? <>Too many matches, specify another filter</>
        : countriesToDisplay.length === 1
        ? <>
            <h1>{countriesToDisplay[0].name}</h1>
            <div>Capital: {countriesToDisplay[0].capital}</div>
            <div>Population: {countriesToDisplay[0].population}</div>
            <h3>languages</h3>
            <ul>
              {
                countriesToDisplay[0].languages.map(language => <li>{language.name}</li>)
              }
            </ul>
            <img src={countriesToDisplay[0].flag} width='150' height='100'/>
          </>
        : countriesToDisplay.map(country => <div key={country.name}>{country.name}</div>)
      }
    </div>
  )
}

const App = () => {
  // Fetches countries data
  const [countries, setCountries] = useState([])
  useEffect(() => {
    console.log("Fetching countries...") /////////////////
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Promise fulfilled') /////////////////
        console.log(response) ////////////////////////////
        // response.data list of objects, contain countries info
        setCountries(response.data)
      })
  },[])

  // Find countries
  const [searchInput, setSearchInput] = useState('')
  const searchCountry = (e) => setSearchInput(e.target.value)

  return (
    <div className="App">
      <Search searchCountry={searchCountry}/>
      <DisplayCountries 
        countries={countries}
        searchInput={searchInput}/>
    </div>
  )
}

export default App
