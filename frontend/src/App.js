import React from "react";
import './App.css';
import Management from "./components/management.js";
import TimeAndData from "./components/timeAndDate.js";
import Main from "./components/main.js";

function App() {
// =================================================================
// Główny plik renderowny na stronie
//  <Management /> - odpowieda za zarządzenia podzespołami
// <TimeAndData /> - odpowiada za wyświtlanie danych z bazy
// =================================================================
  return(<div>
    <div className="panelBar">
      <div className="upBar">
        <Management/>
      </div>
      <div className="downBar">
        <TimeAndData />
      </div>
    </div>
    <div className="contentBar">
        <Main />
    </div>
    <div className="clear"></div>
  
  </div>)
}

export default App