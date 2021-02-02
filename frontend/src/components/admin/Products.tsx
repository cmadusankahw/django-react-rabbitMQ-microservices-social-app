import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Product } from "./interfaces/product";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Note: ***** Modern way to call a async func in useEffect ******
  useEffect(() => {
    (async () => {
      const response = await fetch("http://0.0.0.0:8000/api/products");

      const data = await response.json();

      setProducts(data);
    })();
  }, []);

  return (
    <Wrapper>
      <h2 className="pt-3 pb-3">All Products: </h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} height="180" />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.likes}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
