import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader, loader as menuLoader } from "./feature/menu/Menu";
import Cart from "./feature/cart/Cart";
import CreateOrder, {
  action,
  action as createOrderAction,
} from "./feature/order/CreateOrder";
import Order, { loader as orderLoader } from "./feature/order/Order";
import AppLayout from "./ui/AppLayout";
import { action as makePriorityAction } from "../src/feature/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: makePriorityAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
