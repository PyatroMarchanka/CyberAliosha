import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainWindow from "./components/MainWindow/MainWindow";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
    <div>
    <Header />
    <MainWindow />
    <Footer />
    </div>
     
    </div>
  );
}

export default App;
