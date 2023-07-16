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
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import { isNativeError } from "util/types";

//Dlya deploy - deaktivaziya  react dev tools
//npm i @fvilers/disable-react-devtools  - ustanovim


let environment = 'PROD'//"DEV"; // menyaetm po neobxodimosti na "PROD"
let BACKEND_URL: string; 

// environment === "DEV" ? BACKEND_URL = SERVER_URL : BACKEND_URL = ""
// environment === "DEV" ? null : disableReactDevTools()
if (environment === "DEV") {
  BACKEND_URL = SERVER_URL;
} else {
  BACKEND_URL = "https://moovi-booking-back.onrender.com";// suda podstavili
  disableReactDevTools(); 
}

//omRender.com:
//ne podxodit k react Native
//opziya Static Site - eto  Deploy dlya  frontend ( Angular, Flutter, React e.t.c.)
//opziya WEB Service - eto  Deploy dlya backend

//https://moovi-booking-back.onrender.com/api/user/login   eto proverka posle render servera
//https://moovi-booking-back.onrender.com - vot eto poluchili posle render kak URL back
//Backend vozvrashaet nam requests

//{"error":"Something went wrong."}  poluchili vot etot otvet
//user ne vidit nativ https://moovi-booking-back.onrender.com . Nash kod clienta  eto vidit

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
