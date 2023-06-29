import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";
import UserData from "./model/UserData";
import { Customers, Home, Orders, Products, ShoppingCart, SignIn, SignOut } from "./pages";
import { useAuthSelector } from "./redux/store";
import { AuthRole } from "./redux/types";

export type MenuPoint = {
  title: string;
  path: string;
  element: ReactElement;
  forRoles: Array<string | null>;
}

const menuPoints: MenuPoint[] = [
  {
    title: "Home",
    element: <Home />,
    path: "",
    forRoles: [null, "admin", "user"]
  },
  {
    title: "Products",
    element: <Products />,
    path: "products",
    forRoles: ["admin", "user"]
  },
  {
    title: "Customers",
    element: <Customers />,
    path: "customers",
    forRoles: ["admin"]
  },
  {
    title: "Orders",
    element: <Orders />,
    path: "orders",
    forRoles: ["admin"]
  },
  {
    title: "Shopping Cart",
    element: <ShoppingCart />,
    path: "shoppingcart",
    forRoles: ["user"]
  },
  {
    title: "Sign In",
    element: <SignIn />,
    path: "signin",
    forRoles: [null]
  },
  {
    title: "Sign Out",
    element: <SignOut />,
    path: "signout",
    forRoles: ["admin", "user"]
  }
]

const App: React.FC = () => {
  const auth: UserData = useAuthSelector();
  const currentPoints: MenuPoint[] = menuPoints.filter((point) => point.forRoles.includes(auth ? auth.role : null))
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigatorDispatcher menuPoints={currentPoints} />}>
          {currentPoints.map((point, index) => 
            <Route key={index} index={point.path === ""} path={point.path}  element={point.element} />)}
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
