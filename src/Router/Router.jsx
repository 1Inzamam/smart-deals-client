import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../Components/AllProducts/AllProducts";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Root from "../Root/Root";
import MyProducts from "../Components/MyProducts/MyProducts";
import MyBids from "../Components/MyBids/MyBids";
import PrivateRoute from "../Private/PrivateRoute";
import ProductDetails from "../Components/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
