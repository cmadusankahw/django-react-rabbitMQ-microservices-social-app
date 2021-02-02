import React from "react";
import "./App.css";
import Products from "./components/admin/Products";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Route path="/" exact component={Main} />
        <Route path="/admin/products" component={Products} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
