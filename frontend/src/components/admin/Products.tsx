import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Product } from "./interfaces/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const apiURL = "http://0.0.0.0:8000/api/products";

  // Note: ***** Modern way to call a async func in useEffect ******
  useEffect(() => {
    (async () => {
      const response = await fetch(apiURL);

      const data = await response.json();

      setProducts(data);
    })();
  }, []);

  // Delete a product
  const del = async (id: number) => {
    if (window.confirm(`Are you sure to delete product:${id} ?`)) {
      await fetch(`${apiURL}/${id}`, {
        method: "DELETE",
      });

      // refresh frontend (filtering the removed product)
      setProducts(products.filter((p: Product) => p.id !== id));

      console.log(`Product: ${id} Deleted`);
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link
            className="btn btn-sm btn-outline-secondary"
            to="products/create"
          >
            Add New Product
          </Link>
        </div>
      </div>

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
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        className="btn btn-sm btn-outline-success"
                        to={`products/edit/${p.id}/edit`}
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => del(p.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
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
