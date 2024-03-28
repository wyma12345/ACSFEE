import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import {Routes} from "react-router";
import Users from "./pages/Users/Users";
import Menu from "./pages/menu";
import Criticism from "./pages/Criticism/Criticism";
import Ideas from "./pages/Ideas/Ideas";
import Surveys from "./pages/Surveys/Surveys";
import MainPage from "./pages/Main/Main";
import Message from "./pages/Message/Message";
import LoggedIn from "./pages/LoggedIn/LoggedIn";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [Loading, setLoading] = useState(false)
  const [IdRest, setIdRest] = useState("")

    useEffect(()=>{ console.log(IdRest)}, ["Admin Id " + IdRest])


        return (
    <div className="App">
      <BrowserRouter basename="/">
          {isLoggedIn && <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
        {isLoggedIn ?
        <Routes>
          <Route exact path="/users" element={<Users setLoading={setLoading} IdRest={IdRest}/>}/>
          <Route exact path="/surveys" element={<Surveys setLoading={setLoading} IdRest={IdRest}/>}/>
          <Route exact path="/ideas" element={<Ideas setLoading={setLoading} IdRest={IdRest}/>}/>
          <Route exact path="/criticism" element={<Criticism setLoading={setLoading} IdRest={IdRest}/>}/>
          <Route exact path="/message" element={<Message setLoading={setLoading} IdRest={IdRest}/>}/>
        </Routes> :
            <LoggedIn setIdRest={setIdRest} setIsLoggedIn={setIsLoggedIn} setLoading={setLoading}/>}
      </BrowserRouter>
      {Loading && <p className="LoadingText">Загрузка...</p>}
    </div>
  );
}

export default App;
