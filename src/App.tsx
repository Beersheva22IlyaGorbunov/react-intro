import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigator from "./components/navigators/Navigator";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";

export type MenuPoint = {
  title: string;
  path: string;
  element: ReactElement;
}

const menuPoints: MenuPoint[] = [
  {
    title: "Home",
    element: <Home />,
    path: ""
  }
]

const nonAuthenticatedPoints: MenuPoint[] = [
  {
    title: "Sign In",
    element: <SignIn />,
    path: "signin"
  }
]

const adminPoints: MenuPoint[] = [
  {
    title: "Customers",
    element: <Customers />,
    path: "customers"
  },
  {
    title: "Orders",
    element: <Orders />,
    path: "orders"
  }
]

const userPoints: MenuPoint[] = [
  {
    title: "ShoppingCart",
    element: <ShoppingCart />,
    path: "shoppingcart"
  }
]

const authenticatedPoints: MenuPoint[] = [
  {
    title: "Sign Out",
    element: <SignOut />,
    path: "signout"
  }
]

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigator menuPoints={menuPoints} />}>
          {menuPoints.map((point, index) => 
            <Route key={index} index={point.path === ""} path={point.path}  element={<Home />} />)}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
