import { useEffect, useState } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const [latestProducts, setLatestProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!latestProductsPromise) return;
    setLatestProducts(null);
    latestProductsPromise
      .then((data) => {
        if (mounted) setLatestProducts(data);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(err);
      });
    return () => {
      mounted = false;
    };
  }, [latestProductsPromise]);

  if (error) return <div>Error loading products</div>;
  if (!latestProducts) return <div>Loading...</div>;

  return (
    <div >
      <h2 className="text-5xl text-center">
        Recent <span className="text-purple-600">Products</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
