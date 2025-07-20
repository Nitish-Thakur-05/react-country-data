import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import styles from './Country.module.css'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import BorderCountry from './BorderCountry.jsx'

export default function Country() {
    const queryData =useParams()
    const location = useLocation()
    const [fetchedData, setFetchedData] = useState(null)
    const [borderCountry, setBorderCountry] = useState([])
    const [countryNotFound, setCountryNotFound] = useState(false)
    const [isBorderFetched, setIsBorderFetched] = useState(false)

    useEffect(() => {
        const fetchingData = async () => {

            if(location.state) {
                setFetchedData(location.state)

                if(location.state.borders) {
                    const borderFetch = Array.from(location.state.borders).map((curr) => {
                        return fetch(`https://restcountries.com/v3.1/alpha/${curr}`)
                        .then((response) => response.json())
                        .then(([data]) => {
                            return data.name.common
                        })
                        .catch((error) => {
                            console.error("Error fetching border country data:", error);
                        });
                    })
    
                    const borderNames = await Promise.all(borderFetch)
                    setBorderCountry(borderNames)
                    setIsBorderFetched(true)
                } else {
                    setIsBorderFetched(true)
                }
                return
            }
            
            // fetching country data (fallback if user comes on country page directly)
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${queryData.country}`)
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const [countryData] = await res.json()
                setFetchedData(countryData)

                // fetching border data
                if(countryData.borders) {
                    const borderFetch = countryData.borders.map((curr) => {
                        return fetch(`https://restcountries.com/v3.1/alpha/${curr}`)
                        .then((response) => response.json())
                        .then(([data]) => {
                            return data.name.common
                        })
                        .catch((error) => {
                            console.error("Error fetching border country data:", error);
                        });
                    })

                    const borderNames = await Promise.all(borderFetch)
                    setBorderCountry(borderNames)
                    setIsBorderFetched(true)
                } else {
                    setIsBorderFetched(true)
                }
            } catch (err) {
                setCountryNotFound(true)
            }
        }
        fetchingData()
    }, [queryData.country])

    // back button logic
    const navigate = useNavigate();
    function back() {
        navigate(-1)
    }

    if(countryNotFound) {
        return <h3 style={{marginTop: '80px'}}>Country not found</h3>
    }
 
  return (
        fetchedData === null || !isBorderFetched ? <Spinner />  : 
        (
            <main className={styles['country-main']}>
                <button onClick={back} className={styles["back-btn"]}><i className="fa-solid fa-arrow-left"></i>&nbsp; Back</button>

                <div className={styles.container}>
                    <div className={styles["flag-container"]}>
                        <img src={fetchedData.flags.svg || fetchedData.flags.png} alt="country-flag-img" className={styles["flag-img"]} />
                    </div>

                    <div className="country-details">
                        <h2 className={styles["country-name"]}>{fetchedData.name.common}</h2>
                        <div className={styles["all-details"]}>
                            <p className={styles["native-name"]}><b>Native Name: </b>{fetchedData.name.nativeName ? Object.values(fetchedData.name.nativeName)[0]?.common : 'N/A'}</p>
                            <p className={styles.population}><b>Population: </b>{fetchedData.population.toLocaleString('en-IN')}</p>
                            <p className={styles.region}><b>Region: </b>{fetchedData.region}</p>
                            <p className={styles["sub-region"]}><b>Sub Region: </b>{fetchedData.subregion || "N/A"}  </p>
                            <p className={styles.capital}><b>Capital: </b>{fetchedData.capital || "N/A"}</p>
                            <p className={styles.domain}><b>Top Level Domain: </b>{fetchedData.tld}</p>
                            <p className={styles.currency}><b>Currencies: </b>{Object.values(fetchedData.currencies)[0].name}</p>
                            <p className={styles.languages}><b>Languages: </b>{Object.values(fetchedData.languages)}</p>
                        </div>

                        <div className={styles.border}><b>Border Countries: &nbsp;</b> 
                            {borderCountry && borderCountry.length > 0 ? borderCountry.map((curr, i) => {
                                return <BorderCountry countryName={curr} href={`/${curr}`} key={i}/>
                            }) : <p>N/A</p>}
                        </div>
                    </div>
                </div>
            </main>
        )
    )
}
