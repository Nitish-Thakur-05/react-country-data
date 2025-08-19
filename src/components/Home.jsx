import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import styles from "../App.module.css";
import CardContainer from "./CardContainer.jsx";
import { useEffect, useRef, useState } from "react";
import HomePageShimmer from "./HomePageShimmer.jsx";
import Error from "./Error.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [searchedText, setSearchedText] = useState("");
  const timeRef = useRef(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((mydata) => {
        setCountryData(mydata);
        setFilteredCountry(mydata);
        setShowLoader(false);
      })
      .catch(() => {
        setShowLoader(false);
        navigate("/error");
      });
  }, []);

  // search function
  function searchFunction(e) {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const filtered = countryData.filter((curr, i) => {
        return curr.name.common
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase());
      });
      setFilteredCountry(filtered);
      setSearchedText(e.target.value);
    }, 500);
  }

  //highlighting the searched word
  function highlightText(name, search) {
    if (!search) return name;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = name.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  // filter function
  function filter(e) {
    const continentMatched = countryData.filter((curr, i) => {
      return curr.continents[0]
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredCountry(continentMatched);
  }

  // for browser to not remember the scroll position
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (countryData === null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [countryData]);

  return (
    <main className={styles["home-main"]}>
      <section className={styles.tools}>
        <SearchBar searchFunction={searchFunction} />
        <Filter filter={filter} />
      </section>

      <section className={styles["card-container"]}>
        {countryData === null && showLoader ? (
          <HomePageShimmer />
        ) : filteredCountry.length != 0 ? (
          filteredCountry.map((curr, i) => (
            <CardContainer
              key={i}
              imageSrc={curr.flags?.svg}
              countryName={highlightText(curr.name.common, searchedText)}
              totalPopulation={curr.population.toLocaleString("en-IN")}
              region={curr.region}
              capital={curr.capital?.[0] || "N/A"}
              data={curr}
              continent={curr.continents}
            />
          ))
        ) : (
          <p>No country Found</p>
        )}
      </section>
    </main>
  );
};
