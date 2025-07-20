import { Link } from 'react-router-dom'

export default function BorderCountries({href, countryName}) {
  return (
    <Link to={href}>{countryName}</Link>
  )
}
