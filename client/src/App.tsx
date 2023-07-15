import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import HomePage from "./components/HomePage";
import "./App.scss";
import Booking from "./components/Bookings/Booking";
import Login from "./app/views/login/Login";
import ChangeCredentials from "./app/views/changecredentials/ChangeCredentials";
import MovieListInsertOnce from "./helpers/MovieListInsertOnce";
import OrderResults from "./components/Orders/OrderResults";
import {SERVER_URL} from "./config/config"

let environment = "DEV"; // menyaetm po neobxodimosti na "PROD"
let BACKEND_URL: string; 

//environment === "DEV" ? SERVER_URL = "http://localhost:8000" : SERVER_URL = ""
environment === "DEV" ? BACKEND_URL = SERVER_URL : BACKEND_URL = ""


//const {data} = await axios.get(`${SERVER_URL}/api/products`)

function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Gili, this Route to add movies to DB */}
            {/* <Route path="/" element={<MovieListInsertOnce/>} /> */}           
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/change-credentials/:user" element={<ChangeCredentials />}/>
            <Route path="/movies" element={<Movies />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/order/:id" element={<OrderResults />} />         
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
