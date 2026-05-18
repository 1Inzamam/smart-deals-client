import LatestProducts from "../LatestProducts/LatestProducts";

const Home = () => {
  const latestProductsPromise = fetch(
    "http://localhost:3000/latest-products",
  ).then((res) => res.json()).catch((err) => {
    console.error("Error fetching latest products:", err);
    return [];
  });
  return (
    <div >
      <h1>Home</h1>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
