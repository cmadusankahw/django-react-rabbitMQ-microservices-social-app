import React from "react";
import "./App.css";
import Products from "./components/admin/Products";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import Nav from "./components/Nav";
import ProductsCreate from "./components/admin/ProductsCreate";
import ProductsEdit from "./components/admin/ProductsEdit";

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Route path="/" exact component={Main} />
        <Route path="/admin/products" exact component={Products} />
        <Route path="/admin/products/create" exact component={ProductsCreate} />
        <Route path="/admin/products/:id/edit" exact component={ProductsEdit} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
