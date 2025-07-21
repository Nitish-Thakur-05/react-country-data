import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./components/Home";
import Country from "./components/Country";
import App from "./App";
import Error from "./components/Error";
import NoHeader from "./components/NoHeader";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />}/>
                <Route path=":country" element={<Country />}/>
            </Route>

            <Route element={<NoHeader />}>
              <Route path="/error" element={<Error />}/>
            </Route>
            <Route path="*" element={<Error />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router