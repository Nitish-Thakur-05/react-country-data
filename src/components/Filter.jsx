import React from 'react'

const Filter = ({filter}) => {
  return (
        <select name="filter" onChange={filter}>
            <option value="#" hidden>Filter by region</option>
            <option value="Asia">Asia</option>
            <option value="Africa">africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
  )
}

export default Filter