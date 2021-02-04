import React, { useEffect, useState } from "react";
import { Product } from "../admin/interfaces/product";

const Main = () => {
  const [products, setProducts] = useState([] as Product[]); // casting never Array to Product array to fix errors

  const apiURL = "http://0.0.0.0:8001/api/products";

  useEffect(() => {
    (async () => {
      const response = await fetch(apiURL);
      const data = await response.json();

      setProducts(data);
    })();
  });

  // like method
  const like = async (id: number) => {
    await fetch(`${apiURL}/${id}/like`, {
      method: "POST",
      headers: { ContentType: "applocation/json" },
    });

    setProducts(
      products.map((p: Product) => {
        if (p.id === id) {
          p.likes++;
        }

        return p;
      })
    );
  };

  return (
    <main>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products?.map((p: Product) => {
              return (
                <div className="col" key={p.id}>
                  <div className="card shadow-sm">
                    <img src={p.image} height="180" />
                    <div className="card-body">
                      <p className="card-text">{p.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => like(p.id)}
                          >
                            Like
                          </button>
                        </div>
                        <small className="text-muted">{p.likes} likes</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
