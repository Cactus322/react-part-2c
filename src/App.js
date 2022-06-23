import axios from "axios";
import { useState, useEffect } from "react";
import { Geo } from "./components/Geo";
import { SearchField } from "./components/SearchField";
import { Weather } from "./components/Weather";


const App = () => {
	const [geo, setGeo] = useState([]);
	const [search, setSeacrh] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [isShowed, setIsShowed] = useState(false);
	const [weather, setWeather] = useState();
	const [capital, setCapital] = useState('');
	const [oldCapital, setOldCapital] = useState('');
	const api_key = process.env.REACT_APP_WEATHER_API_KEY;

	useEffect(() => {
		axios
		.get("https://restcountries.com/v3.1/all")
		.then((response) => {
			setGeo(response.data)
		});	
	}, []);

	useEffect(() => {
		if (capital.length > 0 && capital !== oldCapital) {
			setOldCapital(capital);
			axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
			.then((response) => {
				setWeather(response)
			});
		}
	}, [capital, oldCapital, api_key])

	const handleSearchChange = (event) => {
		setSeacrh(event.target.value);
		let searchValue = event.target.value.toLowerCase();

		let newSearchResult = geo.map((geo) => {
			if (geo.name.common.toLowerCase().includes(searchValue)) {
				return geo
			}

			return null
		});

		setSearchResult(newSearchResult.filter(Boolean));
		setCapital('');
	}

	const SearchDefaultMessage = () => (
		<p>Enter the name of the country</p>
	)

	const SearchManyMatchesMessage = () => (
		<p>Too many matches, specify another filter</p>
	)

	const GetSearchMessage = () => {
		if (search.length === 0) {
			return <SearchDefaultMessage />
		} else if (searchResult.length > 10) {
			return <SearchManyMatchesMessage />
		}
	}

	return (
		<div>
			<div>
				<SearchField search={search} handleOnChange={handleSearchChange} />
				<GetSearchMessage />
			</div>

			<ul>
				<Geo 
					geo={searchResult} 
					setGeo={setSearchResult} 
					setCapital={setCapital} 
					isShowed={isShowed} 
					setIsShowed={setIsShowed} 
				/>
			</ul>

			<Weather capital={capital} weather={weather} geo={searchResult} />
		</div>
	)
};

export default App;
