import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Wrapper from "./Wrapper";

const ProductsCreate = () => {
  let history = useHistory();

  const apiURL = "http://0.0.0.0:8000/api/products";

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Handle page History
  const handleHistory = () => {
    history.push("/admin/products");
  };

  // POST request to create products
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(apiURL, {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify({
        title,
        image,
      }),
    });

    // redicrect if successfull
    setRedirect(true);
  };

  if (redirect) {
    history.push("/admin/products");
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary mr-2">Add Product</button>
        <button className="btn btn-outline-danger" onClick={handleHistory}>
          Cancel
        </button>
      </form>
    </Wrapper>
  );
};

export default ProductsCreate;
