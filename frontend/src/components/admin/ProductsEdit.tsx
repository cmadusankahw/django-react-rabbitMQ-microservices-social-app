import React, {
  PropsWithRef,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { Product } from "./interfaces/product";
import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {
  let history = useHistory();

  const apiURL = "http://0.0.0.0:8000/api/products";

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${apiURL}/${props.match.params.id}`);
      const product: Product = await response.json();

      setTitle(product.title);
      setImage(product.image);
    })();
  });

  // Handle page History
  const handleHistory = () => {
    history.push("/admin/products");
  };

  // POST request to create products
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`${apiURL}/${props.match.params.id}`, {
      method: "PUT",
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
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary mr-2">Save Changes</button>
        <button className="btn btn-outline-danger" onClick={handleHistory}>
          Cancel
        </button>
      </form>
    </Wrapper>
  );
};

export default ProductsEdit;
