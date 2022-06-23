import { nanoid } from "nanoid";
import { useEffect } from "react";

export const Geo = ({geo, setGeo, setCapital, isShowed, setIsShowed}) => {
    let countryCapital = '';

    const imgStyles = {
        width: '150px',
        marginTop: '20px'
    }

    useEffect(() => {
        setCapital(countryCapital);
    })

    const handleClickShowCountryButton = (e) => {
        setGeo(e);
    }

    const GeoArray = () => {
        return geo.map(geo => <li key={nanoid()}>{geo.name.common} <button onClick={() => handleClickShowCountryButton([geo])}>show</button></li>)
    }

    const GeoSoloCountry = () => {
        return geo.map(geo => {
            const languages = Object.values(geo.languages);
            countryCapital = geo.capital;

            return (
                <div key={nanoid()}>
                    <h2>{geo.name.common}</h2>
                    <p>Capital {geo.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                        {languages.map(language => <li key={nanoid()}>{language}</li>)}
                    </ul>
                    <img style={imgStyles} src={geo.flags.svg} alt='flag' />
                </div>
            )
        })
    }

    const GetGeoNames = () => {
        if (geo.length === 1) {
            return <GeoSoloCountry />
        } else if (geo.length > 10) {
            return null
        } else if (geo.length > 1) {
            return <GeoArray />
        }
    }

    return (
        <>
            <GetGeoNames />
        </>
    )
}