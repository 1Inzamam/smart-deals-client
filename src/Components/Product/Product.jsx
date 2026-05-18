import { Link } from "react-router";

const Product = ({ product }) => {
    const {_id, title, price_min, price_max, image } = product;

   console.log(product);
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="p-4">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p>
         Price: tk {price_min} - tk {price_max}
        </p>
        <div className="card-actions">
          <Link to={`/product-details/${_id}`} className="btn btn-primary-gradient w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
