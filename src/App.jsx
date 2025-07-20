import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default App